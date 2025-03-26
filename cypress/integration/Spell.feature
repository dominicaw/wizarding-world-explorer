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
        Then the "😔 Something went wrong. Please try again." text should be visible
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

    Scenario: The user can filter by spell type
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen

        When the API responds the filtered spells list
        And they select "Charm" in the "Filter by spell type" dropdown
        Then the spells list should contain the following items
            | name                | tag   | description                                                  |
            | Bewitched Snowballs | Charm | Bewitches snowballs to follow and harass a designated target |
            | Bluebell Flames     | Charm | Conjures bluebell flames                                     |

    Scenario: The user sees an error when filtering by spell type
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen

        When the API throws an error when getting the filtered spells list
        And they select "Charm" in the "Filter by spell type" dropdown
        Then the "😔 Something went wrong. Please try again." text should be visible

    Scenario: The user can view spell details screen
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen

        When the API responds with one spell details
        And the "Bedazzling Hex" card is pressed
        Then the "Bedazzling Hex" text should be visible
        And the "Disguises things" text should be visible
        When the "Back" button is pressed
        Then the user should be on the "Home" screen

    Scenario: The user sees an error when viewing spell details
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen

        When the API throws an error when getting spell details
        And the "Bedazzling Hex" card is pressed
        Then the "😔 Something went wrong. Please try again." text should be visible

    Scenario: The user can add a spell to their favourites
        When the API responds with the full spells list
        And the user manually navigates to the 'Home' screen

        When the user presses the favourite button on the "Bedazzling Hex" card
        And the user manually navigates to the 'Favourites' screen
        Then the spells list should contain the following items
            | name           | tag | description      |
            | Bedazzling Hex | Hex | Disguises things |

    Scenario: The user sees a message when they have no favourites
        When the API responds with the full spells list
        And the user manually navigates to the 'Favourites' screen
        Then the "🤔 You have no favourited spells yet. Add some!" text should be visible

    Scenario: The user sees an error on the favourites screen
        When the API throws an error when getting the full spells list

        And the user manually navigates to the 'Favourites' screen
        Then the "😔 Something went wrong. Please try again." text should be visible