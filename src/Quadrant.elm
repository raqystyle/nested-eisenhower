module Quadrant exposing (..)

import Html as H exposing (Html, div, span, header, text, input, button)
import Html.Attributes exposing (class, value)
import Html.Events exposing (onClick, onInput)
import TodoItem

type UrgencyLevels = DoFirst | Schedule | Delegate | DontDo

getColorByUrgency : UrgencyLevels -> String
getColorByUrgency lvl = case lvl of
  DoFirst -> "bg-green-50"
  Schedule -> "bg-blue-50"
  Delegate -> "bg-yellow-50"
  DontDo -> "bg-red-50"

type Msg
  = EnterNewTodoText String
  | AddNewTodo
  | FromTodo Int TodoItem.Msg

type alias Model =
    { newTodoText : String
    , urgencyLevel : UrgencyLevels
    , todos : List TodoItem.Model
    }

updateTodo : Int -> TodoItem.Msg -> Int -> TodoItem.Model -> TodoItem.Model
updateTodo listIdx todoMsg todoIdx todoModel =
  if listIdx == todoIdx then TodoItem.update todoMsg todoModel else todoModel

update : Msg -> Model -> Model
update msg model =
  case msg of
    EnterNewTodoText str ->
      { model
          | newTodoText = str
      }
    AddNewTodo ->
      let
        newItemId = String.fromInt <| List.length model.todos
      in
      { model
          | todos = (TodoItem.init newItemId model.newTodoText) :: model.todos
          , newTodoText = ""
      }
    FromTodo idx todoMsg ->
      { model
          | todos = List.indexedMap (updateTodo idx todoMsg) model.todos
      }

init : UrgencyLevels -> Model
init urgencyLevel =
  { newTodoText = ""
  , urgencyLevel = urgencyLevel
  , todos = []
  }

renderTodo : Int -> TodoItem.Model -> Html Msg
renderTodo idx todoModel = H.map (FromTodo idx) <| TodoItem.view todoModel

view : Model -> Html Msg
view model =
  let 
    renderTodos = List.indexedMap (renderTodo) model.todos
  in
  div
    [ class <| "p-2 flex-1 " ++ (getColorByUrgency model.urgencyLevel) ]
    [ header
        [ class "mb-2" ]
        ([ span
            [ class "font-bold px-2 py-1 rounded-md bg-white shadow-md mr-2" ]
            [ text "Label" ]
        , input
            [ class "border-2 border-gray-200 rounded-md text-gray-600 outline-none focus:border-indigo-400"
            , onInput EnterNewTodoText
            , value model.newTodoText
            ]
            []
        , button
            [ class "border-2 rounded-md px-2 bg-white font-bold"
            , onClick AddNewTodo
            ]
            [ text "Add" ]
        ] ++ renderTodos)
    ]