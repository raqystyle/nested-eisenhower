module Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Domain
import Html as H exposing (div, header, section, text)
import Html.Attributes exposing (class)
import Quadrant as Q exposing (Msg(..))
import Url


main : Program () Model Msg
main =
    Browser.application
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
    = FromQuadrant Domain.UrgencyLevels Q.Msg
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


update : Msg -> Model -> ( Model, Cmd Msg )
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
                Domain.DoFirst ->
                    ( { model | doFirst = Q.update quadrantMsg model.doFirst }, Cmd.none )

                Domain.Schedule ->
                    ( { model | schedule = Q.update quadrantMsg model.schedule }, Cmd.none )

                Domain.Delegate ->
                    ( { model | delegate = Q.update quadrantMsg model.delegate }, Cmd.none )

                Domain.DontDo ->
                    ( { model | dontDo = Q.update quadrantMsg model.dontDo }, Cmd.none )


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
    ( Model
        key
        url
        (Q.init Domain.DoFirst)
        (Q.init Domain.Schedule)
        (Q.init Domain.Delegate)
        (Q.init Domain.DontDo)
    , Cmd.none
    )


view : Model -> Browser.Document Msg
view model =
    { title = "Nested Eisenhower"
    , body =
        [ div
            [ class "flex flex-col h-full" ]
            [ header
                [ class "p-3 shadow-lg mb-2" ]
                [ div
                    [ class "text-gray-600 font-bold uppercase" ]
                    [ text "Nested Eisenhower" ]
                ]
            , section [ class "text-gray-400" ] [ text "Start -> Foo -> Bar" ]
            , div
                [ class "flex-1 flex" ]
                [ H.map (FromQuadrant Domain.DoFirst) <| Q.view model.doFirst
                , H.map (FromQuadrant Domain.Schedule) <| Q.view model.schedule
                ]
            , div
                [ class "flex-1 flex" ]
                [ H.map (FromQuadrant Domain.Delegate) <| Q.view model.delegate
                , H.map (FromQuadrant Domain.DontDo) <| Q.view model.dontDo
                ]
            ]
        ]
    }
