Feature: Spells

    Users should be able to view spells

    Scenario: The user can view the full list of spells
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen
        Then the spells list should contain the following items
            | name                | tag   | description                                                  |
            | Bedazzling Hex      | Hex   | Disguises things                                             |
            | Bewitched Snowballs | Charm | Bewitches snowballs to follow and harass a designated target |
            | Bluebell Flames     | Charm | Conjures bluebell flames                                     |
        And the pagination should have the text "1 to 3 of 3"

    Scenario: The user sees an error when attempting to view the full spell list
        When the API throws an error when getting the full spells list
        And the user manually navigates to the 'Home' screen
        Then the "Error: 😔 Request failed with status code 500" text should be visible
        And the "Search spells by name" input should be hidden
        And the "Filter by spell name" dropdown should be hidden
        And the pagination should be hidden

    Scenario: The user can search through the list of spells
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen
        Then they type "Bewitched" in the "Search spells by name" input
        Then the spells list should contain the following items
            | name                | tag   | description                                                  |
            | Bewitched Snowballs | Charm | Bewitches snowballs to follow and harass a designated target |

    Scenario: The user sees a message if there are no spells matching their search
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen
        Then they type "Test" in the "Search spells by name" input
        And the "😔 No spells found. Try another search." text should be visible