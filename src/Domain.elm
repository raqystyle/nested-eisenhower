module Domain exposing (..)


type UrgencyLevels
    = DoFirst
    | Schedule
    | Delegate
    | DontDo


urgencyLevelUI : UrgencyLevels -> ( String, String )
urgencyLevelUI level =
    case level of
        DoFirst ->
            ( "Do first", "bg-green-50" )

        Schedule ->
            ( "Schedule", "bg-blue-50" )

        Delegate ->
            ( "Delegate", "bg-yellow-50" )

        DontDo ->
            ( "Don't do", "bg-red-50" )
