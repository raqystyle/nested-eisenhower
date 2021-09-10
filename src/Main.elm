module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Html as H exposing (Html, div, text, header, section)
import Html.Attributes exposing (class)
import Quadrant as Q
import Quadrant exposing (Msg(..))
import Quadrant exposing (UrgencyLevels)
import Url

main : Program () Model Msg
main = Browser.application
  { init = init
  , view = view
  , update = update
  , subscriptions = subscriptions
  , onUrlChange = UrlChanged
  , onUrlRequest = LinkClicked
  }

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

type Msg
  = FromQuadrant UrgencyLevels Q.Msg
  | LinkClicked Browser.UrlRequest
  | UrlChanged Url.Url

type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , doFirst : Q.Model
    , schedule : Q.Model
    , delegate : Q.Model
    , dontDo : Q.Model
    }

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Nav.pushUrl model.key (Url.toString url) )

        Browser.External href ->
          ( model, Nav.load href )

    UrlChanged url ->
      ( { model | url = url }
      , Cmd.none
      )
    FromQuadrant lvl quadrantMsg ->
      case lvl of
         Q.DoFirst -> ({ model | doFirst = Q.update quadrantMsg model.doFirst }, Cmd.none)
         Q.Schedule -> ({ model | schedule = Q.update quadrantMsg model.schedule }, Cmd.none)
         Q.Delegate -> ({ model | delegate = Q.update quadrantMsg model.delegate }, Cmd.none)
         Q.DontDo -> ({ model | dontDo = Q.update quadrantMsg model.dontDo }, Cmd.none)

init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
  ( Model key url (Q.init Q.DoFirst) (Q.init Q.Schedule) (Q.init Q.Delegate) (Q.init Q.DontDo), Cmd.none )

view : Model -> Browser.Document Msg
view model =
  { title = "Nested Eisenhower"
  , body =
      [ div
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
      ]
  }