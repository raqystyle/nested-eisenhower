module Main exposing (..)

import Browser
import Html as H exposing (Html, div, text, header, section)
import Html.Attributes exposing (class)
import Quadrant as Q
import Quadrant exposing (Msg(..))
import Quadrant exposing (UrgencyLevels)

main = Browser.sandbox
  { init = init
  , view = view
  , update = update
  }

type Msg
  = FromQuadrant UrgencyLevels Q.Msg

type alias Model =
    { doFirst : Q.Model
    , schedule : Q.Model
    , delegate : Q.Model
    , dontDo : Q.Model
    }

update : Msg -> Model -> Model
update msg model =
  case msg of
    FromQuadrant lvl quadrantMsg ->
      case lvl of
         Q.DoFirst -> { model | doFirst = Q.update quadrantMsg model.doFirst }
         Q.Schedule -> { model | schedule = Q.update quadrantMsg model.schedule }
         Q.Delegate -> { model | delegate = Q.update quadrantMsg model.delegate }
         Q.DontDo -> { model | dontDo = Q.update quadrantMsg model.dontDo }

init : Model
init =
  { doFirst = Q.init Q.DoFirst
  , schedule = Q.init Q.Schedule
  , delegate = Q.init Q.Delegate
  , dontDo = Q.init Q.DontDo
  }

view : Model -> Html Msg
view model =
  div
    [ class "flex flex-col h-full"]
    [ header
        [ class "p-3 shadow-lg mb-2" ]
        [ div
            [class "text-gray-600 font-bold uppercase"]
            [ text "Nested Eisenhower" ]
        ]
    , section [ class "text-gray-400" ] [ text "Start -> Foo -> Bar" ]
    , div
        [ class "flex-1 flex" ]
        [ H.map (FromQuadrant Q.DoFirst) <| Q.view model.doFirst
        , H.map (FromQuadrant Q.Schedule) <| Q.view model.schedule
        ]
    , div
        [ class "flex-1 flex" ]
        [ H.map (FromQuadrant Q.Delegate) <| Q.view model.delegate
        , H.map (FromQuadrant Q.DontDo) <| Q.view model.dontDo
        ]
    ]