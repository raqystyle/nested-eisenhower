module Main exposing (main)

import Html exposing (div, text, header, section, span, input, a, button)
import Html.Attributes exposing (class, checked, href, type_)
import Html.Attributes exposing (classList)

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
        [ div
            [ class "p-2 flex-1 bg-green-50" ]
            [ header
                [ class "mb-2" ]
                [ span
                    [ class "font-bold px-2 py-1 rounded-md bg-white shadow-md mr-2" ]
                    [ text "Label" ]
                , input
                    [ class "border-2 border-gray-200 rounded-md text-gray-600 outline-none focus:border-indigo-400" ]
                    []
                , button
                    [ class "border-2 rounded-md px-2 bg-white font-bold" ]
                    [ text "Add" ]
                ]
              , div
                  [ class "p-1 flex items-center" ]
                  [ input [type_ "checkbox", checked True] []
                  , a
                      [ href "/123", classList [("line-through text-gray-400", True)] ]
                      [ text "This is a task" ]
                  ]
            ]
        , div
            [ class "p-2 flex-1 bg-blue-50" ]
            []
        ]
    , div
        [ class "flex-1 flex" ]
        [ div
            [ class "p-2 flex-1 bg-yellow-50" ]
            []
        , div
            [ class "p-2 flex-1 bg-red-50" ]
            []
        ]
    ]