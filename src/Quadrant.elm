module Quadrant exposing (..)

import Html exposing (div)
import Html.Attributes exposing (class)
import Html exposing (span)
import Html exposing (header)
import Html exposing (text)
import Html exposing (input)
import Html exposing (button)
import Html.Attributes exposing (type_)
import Html.Attributes exposing (checked)
import Html exposing (a)
import Html.Attributes exposing (href)
import Html.Attributes exposing (classList)

view color =
  div
    [ class <| "p-2 flex-1 " ++ color ]
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