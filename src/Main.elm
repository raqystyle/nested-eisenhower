module Main exposing (main)

import Html exposing (div, text, header, section)
import Html.Attributes exposing (class)
import Quadrant as Q

main =
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
        [ Q.view "bg-green-50"
        , Q.view "bg-blue-50"
        ]
    , div
        [ class "flex-1 flex" ]
        [ Q.view "bg-yellow-50"
        , Q.view "bg-red-50"
        ]
    ]