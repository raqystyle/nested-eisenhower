module TodoItem exposing (..)

import Html exposing (Html, a, div, input, text)
import Html.Attributes exposing (checked, class, classList, href, type_)
import Html.Events exposing (onClick)


type Msg
    = Tick


type alias Model =
    { id : String
    , text : String
    , done : Bool
    }


init : String -> String -> Model
init id text =
    { id = id, text = text, done = False }


update : Msg -> Model -> Model
update msg model =
    case msg of
        Tick ->
            { model | done = not model.done }


view : Model -> Html Msg
view model =
    div
        [ class "p-1 flex items-center" ]
        [ input
            [ type_ "checkbox"
            , onClick Tick
            , checked model.done
            ]
            []
        , a
            [ href ("/" ++ model.id), classList [ ( "line-through text-gray-400", model.done ) ] ]
            [ text model.text ]
        ]
