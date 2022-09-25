namespace SpriteKind {
    export const Decoration = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const BullDozer = SpriteKind.create()
    export const EggLikeMouse = SpriteKind.create()
}
function getFinalScript (name: string, theySaidYes: boolean) {
    if (theySaidYes) {
        if (name == "Tony") {
            list = [
            "Thanks!",
            "The path to Tulip Town will be cleared in a jiffy!",
            "Like the peanut butter",
            "That's right! I'm a peanut butter lovin' turtle",
            "It's good for the old gums"
            ]
            inventory = "a way home"
        } else if (name == "Flippy") {
            list = [
            "I appreciate it!",
            "But hey, no such thing as a free lunch, right?",
            "Take this key to my lumberyard",
            "Any time you need supplies, take as much as you want!"
            ]
            inventory = "a key made of wood"
        } else if (name == "Avery") {
            list = [
            "Haha, yes!",
            "This is going to be the best house in town",
            "Don't go too wild with the dozer!",
            "I know it's tempting, but most people object to having their houses torn down",
            "Learned that one the hard way..."
            ]
            inventory = "a key that says bulldozer"
        } else if (name == "Marguerite") {
            list = [
            "Oh joy! Oh happiness! To be with my egg again!",
            "How can I ever repay you?",
            "I don't have much...",
            "But you can have a stick from my nest!",
            "Here, it's my favorite one"
            ]
            inventory = "a stick"
        }
    } else {
        if (name == "Tony") {
            list = [
            "Ah, that's fine",
            "It's always good to get some exercise when you're my age",
            "And the next tulip festival isn't for a hundred years",
            "Which I of course will be around for as a turtle",
            "You probably won't",
            "Don't dwell on it though!",
            "It's best to live in the present",
            "Unless you basically live forever like I do"
            ]
        } else if (name == "Flippy") {
            list = [
            "What!?",
            "Alright...",
            "It's just, we don't have may trees underwater",
            "I'd really appreciate if your could find me something"
            ]
        } else if (name == "Avery") {
            list = ["Ah, that's fine", "I can just try haggling with that cantankerous old dolphin again"]
        } else if (name == "Marguerite") {
            list = ["Oh... My mistake", "I could have sworn...", "Sorry! I guess I'm just so flustered that anything looks like my egg!"]
        }
    }
    return list
}
function loadMap (column: number, row: number) {
    currentMapCol = column
    currentMapRow = row
    tiles.loadMap(mapMap[row][column])
}
spriteutils.createRenderable(10000, function (screen2) {
    screen2.replace(15, 3)
    screen2.replace(6, 3)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (overlappingEgg && thePlayer.overlapsWith(overlappingEgg)) {
        tiles.setTileAt(tiles.locationOfSprite(overlappingEgg), assets.tile`myTile`)
        inventory = "egg-like mouse"
        overlappingEgg.destroy()
        eggSign.destroy()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    spawnLocation = tiles.locationInDirection(location, CollisionDirection.Top)
    updateNapPoint()
})
tiles.onMapLoaded(function (tilemap2) {
    story.cancelAllCutscenes()
    story.clearAllText()
    tiles.destroySpritesOfKind(SpriteKind.NPC)
    tiles.destroySpritesOfKind(SpriteKind.BullDozer)
    tiles.destroySpritesOfKind(SpriteKind.EggLikeMouse)
    for (let value of tiles.getTilesByType(assets.tile`myTile50`)) {
        tiles.coverAllTiles(assets.tile`myTile50`, assets.tile`myTile20`)
        dozer = sprites.create(img`
            .......................3111111111111111111113....
            ......................333333333333333333333333...
            ......................3333311111111111133133113..
            ......................3313133333333333133313113..
            ......................31313...........313313113..
            ......................3313.............31313113..
            ......................3113.............31333113..
            ......................3113.............31333113..
            ......................3113.............31313113..
            ......................3113.............31313113..
            ......................3113.............31313113..
            ......................3113.............31313113..
            ......................3113.............31313113..
            ......................3113.............31313113..
            ......................31113............31313113..
            ......................3111133333333333331133113..
            ......................3311111111111111111333113..
            ......................3333111111111111133333133..
            .....................333333333333333333333333331.
            .........3333........333333333333333333333333311.
            .....33331333........333311133331133111133333111.
            ....311111333.....3333331133131133133113333331133
            ....311113333333333133331133331111133113333331133
            ...3311113333111113133331133131133133113333331333
            ..33111133333333333133333111333133133113333313333
            ..311111333......33133333333333333333333333133333
            ..31111333.....1331333111111111111111111111111333
            .311111333111133333333313331331331331331331333133
            .311113333333333333333133313331331331331333133313
            311113333333333333.331333133313331333133133313333
            311113333..........33333333333333333333333333333.
            33113333...........31111111111111111111111111113.
            .333333............33111111111111111111111111133.
            ....................333333333333333333333333333..
            `, SpriteKind.BullDozer)
        tiles.placeOnTile(dozer, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile10`)) {
        newNPC = sprites.create(assets.tile`myTile10`, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Cat")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile48`)) {
        tiles.coverAllTiles(assets.tile`myTile48`, assets.tile`myTile36`)
        newNPC = sprites.create(img`
            . . . 3 3 3 . . . . . . . . . . 
            . . 3 3 1 3 3 . . . . . . . . . 
            . . 3 1 3 1 3 . . . . . . . . . 
            . 3 3 3 3 3 3 3 . . 3 3 3 1 . . 
            . 3 1 1 1 1 1 3 3 3 3 3 1 3 . . 
            . . 3 1 3 1 1 3 3 1 3 1 3 3 3 3 
            . . . 3 1 1 1 1 3 3 1 3 1 3 1 1 
            . . . . 3 3 1 1 3 3 1 3 3 3 3 3 
            . . . 3 3 3 1 1 1 3 3 1 3 3 3 1 
            . . 3 1 1 1 1 1 1 3 3 1 1 3 1 1 
            . . 3 3 3 3 3 3 1 3 3 1 3 3 3 3 
            . 3 3 3 3 . 3 1 1 3 3 1 3 1 3 . 
            . 3 1 3 . . 3 1 1 3 3 1 3 3 . . 
            . 3 3 3 . 3 1 1 1 3 3 1 3 . . . 
            . 3 1 3 . 3 1 1 1 3 . . . . . . 
            . 3 3 3 . 3 3 3 3 3 . . . . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Tony")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile46`)) {
        tiles.coverAllTiles(assets.tile`myTile46`, assets.tile`myTile20`)
        newNPC = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 3 . . . . . . . . 
            . . . . . . 3 1 3 . . . . . . . 
            . . . . 3 3 1 1 3 . . . . . . . 
            . . . 3 1 1 1 1 1 3 3 . . . . . 
            . . 3 1 3 1 1 1 1 1 1 3 . . . . 
            . 3 1 1 1 1 1 1 1 1 1 1 3 . . . 
            3 1 1 3 1 1 1 1 1 1 1 1 1 3 . . 
            . 3 3 3 3 3 1 1 3 3 1 1 1 3 . . 
            . . . . . . 3 1 3 . 3 1 1 3 . . 
            . . . . . . . 3 . 3 1 1 1 3 . . 
            . . . . . . . . 3 1 1 1 3 . . . 
            . . . . . . . 3 1 1 3 1 1 3 . . 
            . . . . . . . . 3 3 . 3 3 . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Flippy")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile49`)) {
        tiles.coverAllTiles(assets.tile`myTile49`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            . . . . . . . 3 . . . . . . . . 
            . . . . . 3 3 1 3 3 . . . . . . 
            . . . . 3 1 3 1 3 1 3 . . . . . 
            . . . 3 1 3 3 1 3 3 1 3 . . . . 
            . . . 3 1 3 1 1 1 3 1 3 . . . . 
            . . . 3 1 1 1 1 1 1 1 3 . . . . 
            . 3 . 3 1 1 1 1 1 1 1 3 . 3 . . 
            3 1 3 3 3 3 3 3 3 3 3 3 3 1 3 . 
            3 1 1 3 1 1 1 1 1 1 1 3 1 1 3 . 
            . 3 3 3 1 1 1 3 1 1 1 3 3 3 . . 
            3 1 1 3 1 1 1 3 1 1 1 3 1 1 3 . 
            . 3 3 3 1 1 1 3 1 1 1 3 3 3 . . 
            3 1 1 3 1 1 1 3 1 1 1 3 1 1 3 . 
            3 1 3 3 1 1 1 3 1 1 1 3 3 1 3 . 
            . 3 . . 3 1 1 3 1 1 3 . . 3 . . 
            . . . . . 3 3 . 3 3 . . . . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Avery")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile47`)) {
        tiles.coverAllTiles(assets.tile`myTile47`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            . . 3 3 . . . . . . . . . . . . 
            . 3 1 1 3 . . . . . . . . . . . 
            . . 3 1 3 3 . . . . . . . . . . 
            . 3 1 1 1 1 3 . . . . . 3 . . . 
            . 3 1 3 1 1 1 3 . . . 3 1 3 . . 
            3 1 1 1 1 1 1 3 . . . 3 1 1 3 . 
            3 3 3 3 1 1 1 3 . 3 3 1 1 1 3 . 
            . . . 3 1 1 1 3 3 3 1 1 1 1 3 . 
            . . 3 1 1 3 1 1 1 1 1 3 1 1 3 . 
            . . 3 1 3 1 1 1 1 1 3 1 1 1 3 . 
            . . 3 1 3 1 1 1 3 3 1 1 1 1 3 . 
            . . 3 1 1 3 3 3 1 1 1 1 1 3 . . 
            . . . 3 1 1 1 1 1 1 1 1 3 . . . 
            . . . . 3 3 1 3 3 1 3 3 . . . . 
            . . . . . 3 1 3 3 1 3 . . . . . 
            . . . . . . 3 . . 3 . . . . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Marguerite")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile51`)) {
        tiles.coverAllTiles(assets.tile`myTile51`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            . . . . 3 3 3 3 . . . . . . . . . 
            . . . 3 1 1 1 1 3 3 . . . . . . . 
            . . 3 1 1 1 3 3 1 1 3 . . . . . . 
            . 3 1 3 3 3 3 3 3 1 3 . . . . . . 
            . 3 1 3 3 3 3 3 3 1 3 3 . . . . . 
            . 3 1 3 3 3 3 3 3 1 1 1 3 3 . . . 
            . 3 1 3 3 3 3 3 1 1 1 3 1 1 3 . . 
            . . 3 1 3 3 3 1 1 1 1 1 1 1 1 3 . 
            . . . 3 1 1 1 1 1 1 1 1 1 1 1 3 3 
            . . . . 3 3 1 1 1 1 1 1 1 1 3 3 3 
            . 3 . . 3 3 1 1 1 1 1 3 3 3 . . . 
            3 1 3 3 1 1 1 1 1 1 1 1 1 3 . . . 
            3 1 3 1 3 3 1 1 1 1 1 3 3 1 3 . . 
            . 3 1 3 . 3 1 1 1 1 1 3 . 3 . . . 
            . . 3 1 1 1 1 1 1 1 1 3 . . . . . 
            . . . 3 3 3 1 3 3 3 1 3 . . . . . 
            . . . . . . 3 . . . 3 . . . . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Charles")
        newNPC.setVelocity(25, 0)
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile52`)) {
        tiles.coverAllTiles(assets.tile`myTile52`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            . . . . . 3 3 . . 3 3 . . . . . 
            . . . . 3 1 3 3 3 3 1 3 . . . . 
            . . . . 3 1 1 1 1 1 1 3 . . . . 
            . . . . 3 1 1 1 1 1 1 3 . . . . 
            . . . . 3 1 3 1 1 3 1 3 . . . . 
            . . . . 3 1 1 1 1 1 1 3 . . . . 
            . . . . 3 1 1 1 1 1 1 3 . . . . 
            . . . . 3 1 1 1 1 1 1 3 . . . . 
            . . . 3 1 1 1 1 1 1 1 1 3 . . . 
            . . 3 1 1 1 1 1 1 1 1 1 1 3 . . 
            . . . 3 3 1 1 1 1 1 1 3 3 . . . 
            . . . . 3 1 1 1 1 1 1 3 3 3 1 . 
            . . . . 3 1 1 1 1 1 1 3 1 1 3 . 
            . . . . . 3 1 3 3 1 1 1 1 3 . . 
            . . . . . 3 1 3 3 1 3 3 3 . . . 
            . . . . . . 3 3 3 3 . . . . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Redford")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile53`)) {
        tiles.coverAllTiles(assets.tile`myTile53`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            . . . 3 3 3 3 . . . . . . . . . 
            . 3 3 1 1 1 1 3 . . . . . . . . 
            3 1 1 1 1 3 1 1 3 . . . . . . . 
            3 1 3 3 1 1 1 1 3 . . . . . . . 
            3 1 3 . 3 1 1 1 3 . . . . . . . 
            3 3 3 . 3 1 1 1 3 . . . . . . . 
            . . . . 3 1 1 3 3 . . . . 3 3 3 
            . . 3 3 1 1 3 3 3 3 3 . . 3 1 3 
            . 3 1 1 1 1 1 1 1 1 1 3 3 3 1 3 
            3 1 1 1 1 1 1 1 1 1 1 1 3 1 1 3 
            3 1 1 1 1 1 1 1 1 1 1 3 1 1 1 3 
            . 3 1 1 1 1 1 3 3 1 1 3 1 3 3 3 
            . . 3 3 3 3 3 . 3 1 1 1 3 . . 3 
            . . . . . . . 3 3 1 1 3 . . . . 
            . . . . . . 3 1 1 1 1 1 3 . . . 
            . . . . . . 3 3 3 3 3 3 3 . . . 
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Sir Flemming")
        tiles.placeOnTile(newNPC, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile54`)) {
        tiles.coverAllTiles(assets.tile`myTile54`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            ..........33....
            ..........313...
            ..........3133..
            .........331133.
            .........311113.
            .........311333.
            .........3133...
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            .........313....
            ......333113....
            .....3111113....
            ...331111113....
            ..3111111113....
            .31311111113....
            313311333313....
            .3.3133..313....
            ...313...313....
            ...313...313....
            ...313...313....
            ...313...313....
            ...333...333....
            ................
            `, SpriteKind.NPC)
        sprites.setDataString(newNPC, "name", "Flash")
        tiles.placeOnTile(newNPC, value)
        newNPC.y += -8
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile70`)) {
        tiles.coverAllTiles(assets.tile`myTile70`, assets.tile`myTile62`)
        newNPC = sprites.create(img`
            333333333333333333333333333333333333333333333333333333
            313333333333331111133111331133311313331333333333333313
            333333333333313333311333113133313131313133333333333333
            333333333333331131113111313131313133113133333333333333
            333333333333333131313111313113113131313133333333333333
            333333333333333131313111313113113131133133333333333333
            333333333333333131331333131331331131313133333333333333
            333333333333333313333111333111113313331333333333333333
            333333333333333333133133113313333133333333333333333333
            333333333333333331311311331131331313333333333333333333
            333333333333333331311313113131331313333333333333333333
            333333333333333331333313333131331313333333333333333333
            333333333333333331311313113131111311133333333333333333
            333333333333333331311313113133331333313333333333333333
            313333333333333333133131331311113111133333333333333313
            333333333333333333333333333333333333333333333333333333
            `, SpriteKind.BullDozer)
        tiles.placeOnTile(newNPC, value)
        newNPC.y += -8
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile72`)) {
        tiles.coverAllTiles(assets.tile`myTile72`, assets.tile`myTile15`)
        newNPC = sprites.create(img`
            ................................3333333.................................
            ........................3333333311111113..................33333.........
            .......................313331113111111133................3111113........
            ......................333113333311331111133333..........31111113........
            ......................3333333311133333331111113333333..3111111113.......
            .....................31111333311133311133111111111111333111113113.......
            ....................3113331113111333333331331113333331111111111113......
            ....................31133333331111331111111111333133331133331111113.....
            ....................311111133311113333111111313333113311111111133113....
            ..................33313331111331111111111133113333333311111133331113....
            ...............33313111111131133111111111111111111133313311133311113....
            .....33333333.311111311111111111111133113311311333111111111331111113....
            ....31111111131111111113333331111133111311111133333311111111111111313...
            ...311131113113333311333311113111111111111113333331113331111111111313...
            ...3111113311133333133333333331133313311111113333333333331111111333113..
            ...3113111111113113111133311331111111111111333133333313331333333331313..
            ...3111311111113333113333311131111113311331333331111133311333313333113..
            ..31111111113111333133331111111111333333311333333333311111111113311313..
            ..31131113331113333131111333111133313333313111331111111133333313331313..
            ..31113111111113333111111111113333333133111111111111111333333131333313..
            ...3111111111131331311111111113133133311113333111133333133111131311113..
            ...311111111113111333331311111131133331111131111133333111333333111313...
            ....33333333311333311311111111133333331113131111133331333113331111133...
            .....33311331311111131111331111333113311111111311333113311311111133313..
            ....3331111113333311111111131111111313111111111113333331113111111111113.
            ....3311111111133113111111111111133333111313331113113311311113331311113.
            ...33313333111311333333311111111333333111111111111111331113311111111133.
            ..313311333111113333333331111111333333311111111113333113331111311331313.
            .3113311111111133333333331111131113333111111111333113333111333111111113.
            .11113113113111333333313331111111133111333311333331333113333333313131333
            .11111311331111333113113333311111133133331313333313331111333331131113133
            .31111331133331113333333333111111331333133313333113313311113331331133333
            ..3111333111111111113333331333331131313331313331133113333333333333331113
            .31133331333331113111113313333311113331113313333333133333333331133111113
            .11133311333333311311111133331111131333333331333333133333311111133113313
            .11113313333333311111111133333333331133111311133333113133331111133111113
            .31111113313133333311111111133313333133333313333333313111333333333111113
            .3111131333133333331131133111113333311131111111113331331113333333313311.
            ..333331133333333333131333333333331313331111111111331133331111331111113.
            ..331111133333333333131333111111111113311111111131133113333333111111113.
            .3111111113333333331131133333331111113111111111331113311111133133111113.
            .3111111111111111111333113333111111133111113311111113333333333333111333.
            .3111111111333333333333331131111111331111111111111111111133333331133333.
            .3111133111313313333313333111113333111113313111111113333111133331333333.
            .3311113111331333111133333333333333333311111111111333333333113311333333.
            ..311111113111333333333333331111133333311111111113111133333311313333333.
            ...33333311111111111111133311333333313333111111311111133333331313331133.
            ..31133111311111333333313331333333333333133333113333333333333111111133..
            ..33333333131113333311133313333333133333333333313333333333133111113333..
            ..3133333333113333333333311331131133331333333111333333333113311113333...
            ..33131311331113333333333133333133331133333333113111111111333311133.....
            ..3333333311113313331333.311333333133333333....333331111133311133.......
            .3111333311133333111333..33331111133333333......333333333333113.........
            .31111111133....333333.....3333333333333.........3333333333.33..........
            ..31111133....................33333333..............33333...............
            ...33333................................................................
            `, SpriteKind.BullDozer)
        tiles.placeOnTile(newNPC, value)
        newNPC.bottom = tiles.locationXY(value, tiles.XY.bottom) + 12
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile71`)) {
        tiles.coverAllTiles(assets.tile`myTile71`, assets.tile`myTile`)
        newNPC = sprites.create(img`
            ..3333.3333.....
            .31111311113....
            3111113111113...
            3111113111113...
            3111113111113...
            3111113111113...
            .33333333333....
            3111111111113...
            3111111111113...
            3111111111113...
            3111111111113...
            3111111111113...
            3111111111113...
            .31111111113....
            .31111111113....
            ..311111113.....
            ...3333333......
            .....3133..3333.
            .....31113311113
            ......331111333.
            ........3333....
            `, SpriteKind.EggLikeMouse)
        tiles.placeOnTile(newNPC, value)
    }
})
function getOhIsThatAScript (name: string) {
    if (name == "Tony") {
        list = [
        "Oh hi there",
        "Did you bring that machine for me!?",
        "I could lift at least one rock per day with that thing",
        "That's so nice of you!",
        "Lemme clear those rocks right up"
        ]
    } else if (name == "Flippy") {
        list = [
        "Ey?",
        "Do my crusty old eyes deceive me?",
        "That stick would make a mighty fine walking cane",
        "Toss it over here!"
        ]
    } else if (name == "Avery") {
        list = [
        "Hey, that looks like Old Man Flippy's key",
        "Would you be willing to part with that?",
        "I already finished my dozin'",
        "You could take it for a spin if you want!"
        ]
    } else if (name == "Marguerite") {
        list = [
        "OH!!!!",
        "That egg-like object you're holding...",
        "Could it be!?",
        "Is that my egg!?!?!?!"
        ]
    }
    return list
}
info.onCountdownEnd(function () {
    story.cancelAllCutscenes()
    story.clearAllText()
    story.startCutscene(function () {
        controller.moveSprite(thePlayer, 0, 0)
        animation.runImageAnimation(
        thePlayer,
        [img`
            ....................
            ....................
            .....3........3.....
            ....313......313....
            ....3313....3133....
            ....331333333133....
            ....311111111113....
            ....311111111113....
            ....311131111313....
            ...33333111311133...
            ....31111133313.....
            .....33331111133....
            ......311111133.....
            ......31311113......
            ......31311113......
            ......31111113......
            .......313313.......
            .......333333.......
            ........3..3........
            ....................
            ....................
            `,img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ..........3.........
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `,img`
            ....................
            ....................
            ...3333.............
            ..311113............
            ...33313............
            ....313.............
            ...3133.............
            ..311113............
            ...3333...3.........
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `,img`
            ....................
            .........3333.......
            ...3333.311113......
            ..311113333313......
            ...33313..313.......
            ....313..3133.......
            ...3133.311113......
            ..311113.3333.......
            ...3333...3.........
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `,img`
            ....................
            .........3333.......
            ...3333.311113.3333.
            ..311113.33313311113
            ..333313..313..33313
            ....313..3133...313.
            ...3133.311113.3133.
            ..311113.3333.311113
            ...3333...3....3333.
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `],
        200,
        false
        )
        pause(1000)
        animation.runImageAnimation(
        thePlayer,
        [img`
            ....................
            ....................
            ...3333.............
            ..311113............
            ...33313............
            ....313.............
            ...3133.............
            ..311113............
            ...3333...3.........
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `,img`
            ....................
            .........3333.......
            ...3333.311113......
            ..311113333313......
            ...33313..313.......
            ....313..3133.......
            ...3133.311113......
            ..311113.3333.......
            ...3333...3.........
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `,img`
            ....................
            .........3333.......
            ...3333.311113.3333.
            ..311113.33313311113
            ..333313..313..33313
            ....313..3133...313.
            ...3133.311113.3133.
            ..311113.3333.311113
            ...3333...3....3333.
            .........33333333...
            ........313111313...
            ....3333313111113...
            ..33111131311133....
            .33111113333113.....
            ..3311111111113.....
            ..3311111311113.....
            .33111111331113.....
            ..33111113111133....
            ....3333333311113...
            .......3311111313...
            ........3.3333333...
            `],
        200,
        true
        )
        pause(1800)
        animation.stopAnimation(animation.AnimationTypes.All, thePlayer)
        loadMap(spawnColumn, spawnRow)
        thePlayer.setImage(img`
            . . 3 . . . . . . . . 3 . . 
            . 3 1 3 . . . . . . 3 1 3 . 
            . 3 3 1 3 . . . . 3 1 3 3 . 
            . 3 3 1 3 3 3 3 3 3 1 3 3 . 
            . 3 1 1 1 1 1 1 1 1 1 1 3 . 
            . 3 1 1 1 1 1 1 1 1 1 1 3 . 
            . 3 1 1 1 3 1 1 1 1 3 1 3 . 
            3 3 3 3 3 1 1 1 3 1 1 1 3 3 
            . 3 1 1 1 1 1 3 3 3 1 3 . . 
            . . 3 3 3 3 1 1 1 1 1 3 3 . 
            . . . 3 1 1 1 1 1 1 3 3 . . 
            . . . 3 1 3 1 1 1 1 3 . . . 
            . . . 3 1 3 1 1 1 1 3 . . . 
            . . . 3 1 1 1 1 1 1 3 . . . 
            . . . . 3 1 3 3 1 3 . . . . 
            . . . . 3 3 3 3 3 3 . . . . 
            . . . . . 3 . . 3 . . . . . 
            `)
        tiles.placeOnTile(thePlayer, spawnLocation)
        controller.moveSprite(thePlayer)
        startCountdown()
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.EggLikeMouse, function (sprite, otherSprite) {
    if (!(eggSign) || spriteutils.isDestroyed(eggSign)) {
        eggSign = sprites.create(img`
            .111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111.
            11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            11333133313331111311333131313331113331333131113133313131333133313331113111313331313133133311
            11311131113111111311131133113111113111313133133131313131131131113131113313313131313131131111
            11331131313131331311131133113311113111313131313133313131131133113311113131313131313113133111
            11333133313331111331333131313331113331333131113131113331131133313131113111313331333133133311
            11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            .111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111.
            `, SpriteKind.Decoration)
        eggSign.setPosition(80, 106)
    }
    overlappingEgg = otherSprite
    otherSprite.setImage(img`
        ...1111.1111......
        ..13333133331.....
        .1311113111131....
        131111131111131...
        131111131111131...
        131111131111131...
        131111131111131...
        .1333333333331....
        131111111111131...
        131111111111131...
        131111111111131...
        131111111111131...
        131111111111131...
        131111111111131...
        .1311111111131....
        .1311111111131....
        ..13111111131.....
        ...1333333311111..
        ....1131331133331.
        .....1311133111131
        ......13311113331.
        .......113333111..
        .........1111.....
        `)
    tiles.placeOnTile(overlappingEgg, tiles.locationOfSprite(overlappingEgg))
})
function doYouHaveWhatISeek (name: string) {
    if (name == "Tony") {
        return inventory == "a key that says bulldozer"
    } else if (name == "Flippy") {
        return inventory == "a stick"
    } else if (name == "Avery") {
        return inventory == "a key made of wood"
    } else if (name == "Marguerite") {
        return inventory == "egg-like mouse"
    }
    return false
}
function move_em (movee: Sprite) {
    timer.background(function () {
        story.spriteMoveToLocation(movee, -49, tony.y, 100)
    })
}
function getNPCScript (name: string, happy: boolean) {
    if (name == "Cat") {
        list = [
        "Oh hey.... You woke up",
        "Are you done with that box?",
        "I can take it off your hands",
        "Not for anything weird",
        "like eating it...",
        "HaHa! Caterpillars eat leaves!",
        "What would I eat cardboard for!?!",
        "So.... Can I have it?"
        ]
    } else if (name == "Tony") {
        list = [
        "Arrrgh!",
        "That thunderstorm sure left a lot of rocks behind...",
        "It's gonna take thirty years to clear this out!",
        "I sure wish I wasn't a turtle...",
        "No Tony! You can't wish that!",
        "I just need to get some better tools..."
        ]
    } else if (name == "Flippy") {
        list = [
        "Ahahahahaha *cough* *cough*!",
        "Hey there whippersnapper! Help an old timer out, would ya'?",
        "Find me somethin' to lean on!",
        "When I'm not strong...",
        "Because I spent all weekend movin' lumber around",
        "In my undersea lumber yard!"
        ]
    } else if (name == "Avery") {
        list = [
        "Consarnit!",
        "Where 'm I gonna get more trees!",
        "I only have the door frame to my beautiful manor built",
        "I'm gonna need AT LEAST three more logs...",
        "And I already put that deposit down on the dozer..."
        ]
    } else if (name == "Marguerite") {
        list = [
        "Oh no! Oh no!",
        "Where is it!?",
        "I just put it down...",
        "Oh dear... Oh dear...",
        "Where did I put that weird egg I found!?",
        "I've had it for 20 years! Where could I have put it!?",
        "I'm sure it'll hatch soon..."
        ]
    } else if (name == "Charles") {
        list = [
        "Hmmmmmm....",
        "My new cheese of the month subscription box came in",
        "Oh boy, Charles, time to make a decision",
        "Eat or not, it's a simple question!"
        ]
    } else if (name == "Redford") {
        list = [
        "Oh YESSSS!",
        "My new mouse!",
        "The Smooth-Glide 3000X with Desk Trax (tm) Technology!",
        "I can finally throw out that old mouse I found in that nest..."
        ]
    } else if (name == "Sir Flemming") {
        list = [
        "Oh! Look at the time!",
        "It's almost time for my daily stroll...",
        "I better finish raking the stones in my zen garden before I go",
        "It's good to always come back to a peaceful environment"
        ]
    } else if (name == "Flash") {
        list = [
        "I can't believe those season passes I bought to the amusement park are non refundable",
        "Too TALL to ride on the coaster!?",
        "Who's ever heard of that!?",
        "See if I bring the roller coaster club back to Fun Land anytime soon..."
        ]
    }
    return list
}
function startTalkin (npc: Sprite) {
    if (!(sprites.readDataBoolean(npc, "talking"))) {
        story.startCutscene(function () {
            sprites.setDataBoolean(npc, "talking", true)
            currentScript = getNPCScript(sprites.readDataString(npc, "name"), true)
            for (let value of currentScript) {
                if (!(spriteutils.isDestroyed(npc))) {
                    story.spriteSayText(npc, value, 1, 3, story.TextSpeed.VeryFast)
                }
            }
            if (!(doYouHaveWhatISeek(sprites.readDataString(npc, "name")))) {
                return
            }
            info.stopCountdown()
            currentScript = getOhIsThatAScript(sprites.readDataString(npc, "name"))
            for (let value of currentScript) {
                if (!(spriteutils.isDestroyed(npc))) {
                    story.spriteSayText(npc, value, 1, 3, story.TextSpeed.VeryFast)
                }
            }
            controller.moveSprite(thePlayer, 0, 0)
            story.showPlayerChoices("Yes", "No")
            currentScript = getFinalScript(sprites.readDataString(npc, "name"), story.checkLastAnswer("Yes"))
            for (let value of currentScript) {
                if (!(spriteutils.isDestroyed(npc))) {
                    story.spriteSayText(npc, value, 1, 3, story.TextSpeed.VeryFast)
                }
            }
            if (inventory == "a way home") {
                finalcutscene()
            } else {
                controller.moveSprite(thePlayer)
                info.startCountdown(60)
            }
        })
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile31`, function (sprite, location) {
    spawnLocation = location
    updateNapPoint()
})
function finalcutscene () {
    tony = sprites.allOfKind(SpriteKind.NPC)[0]
    tempY = tony.y
    story.spriteMoveToLocation(tony, 180, tempY, 100)
    tony.destroy()
    tony = sprites.create(img`
        ........................33333333333333333333.....
        .......................3111111111111111111113....
        ......................333333333333333333333333...
        ......................3333311111111111133133113..
        ......................3313133333333333133313113..
        ......................31313.333.......313313113..
        ......................3313.33133.......31313113..
        ......................3113.31313......331333113..
        ......................31133333333..333331333113..
        ......................3113311111333331331313113..
        ......................3113.31311331313331313113..
        ......................3113..3111133131311313113..
        ......................3113...331133133331313113..
        ......................3113.33331113313331313113..
        ......................3113331111113311311313113..
        ......................3111333333313313331313113..
        ......................3111133333113313131133113..
        ......................3311111111111111111333113..
        ......................33331111111111111333331333.
        .....................3333333333333333333333333313
        .........3333........3333333333333333333333333113
        .....33331333........3333111333311331111333331113
        ....311111333.....3333331133131133133113333331133
        ....311113333333333133331133331111133113333331133
        ...3311113333111113133331133131133133113333331333
        ..33111133333333333133333111333133133113333313333
        ..311111333......33133333333333333333333333133333
        ..311113333333.1331333111111111111111111111111333
        .311111333111133333333313331331331331331331333133
        .311113333333333333333133313331331331331333133313
        311113333333333333.331333133313331333133133313333
        311113333..........33333333333333333333333333333.
        33113333...........31111111111111111111111111113.
        .333333............33111111111111111111111111133.
        ....................333333333333333333333333333..
        `, SpriteKind.BullDozer)
    tony.bottom = tempY + -8
    tony.left = 165
    story.spriteMoveToLocation(tony, 160, tony.y, 100)
    for (let value of sprites.allOfKind(SpriteKind.BullDozer)) {
        value.setFlag(SpriteFlag.Ghost, true)
        move_em(value)
    }
    pause(2000)
    thePlayer.setFlag(SpriteFlag.Ghost, true)
    story.spriteMoveToLocation(thePlayer, 112, thePlayer.y, 100)
    story.spriteMoveToLocation(thePlayer, 112, 48, 100)
    THE_END = sprites.create(img`
        1111113333333311133333333111333333333333333333333333333333333333333333333333333333333333331111111111333333333333333111111113333333333333311111111111111111111111
        1111113333333311133333333111333333333331111111113333333333333333333333333333333333333333331111111111333333333333333111111113333333333333331111111111111111111111
        1111113333333311113333331111333333333311111111111333333333333333333333333333333333333333333111111111333333111111111111111133333333333333331111111111111333333333
        1111133333333311111333111111333333311111111111111113333333333333333333333333333333333333333311111111133333111111111111111333333333333333331111111111133333333333
        1111333333333311111111111113333331111111111111111111111133333333333333333333333333333333333331111111113333111111111111113333333333333333331111111111333333333333
        1133333333333331111111111133333111111111111111111111111111333333333333333333333333333333333331111111111111111111111111133333333333333333331111111113333331111133
        3333333333333333111111113333311111111111111111111111111111113333333333333333333333333333333111111111111111111111111111133333333333333333331111111333333111111133
        3333333333333333333333333333111111111111111111111111111111113333333333333333333333333333333111111111111111111111111111133333333333333333333333333333331111111133
        3333331111111333333333333331111111111111113311111111111111113333333333333333333333333333333111133333311111111111111111133333333333333333333333333333311111111133
        3333311111111133333333333311111111111333333333331111111111113333333333333333333333333333333111333333333111111111111111113333333333333333333333333331111111111133
        3333311111111133333333331111111111333333333333333311111111113333333333333333333333333333333111333333333311111111111111111111111111111111111111111111111111133333
        3333311113111133333333111111111133333333333333333311111111113333333333333333333333333333333111333333333331111111111111111111111111111111111111111111111111133333
        3333311133311133333331111111111333333333333333333331111111113333333333333333333333333333333111133333333333311111111111111111111111111111111111111111111111133333
        3333311133333333333111111111133333333333333333333331111111113333333333333333333333333333333111133333333333331111111111111111111111111111111111111111111111133333
        3333311133333333333111111111333333333333333333333331111111133311333333333333333333333333333311133333333333331111111111111111111111111111111111111111111111111111
        3333311133333333333111111133333333333333333333333333311111333111333333333333333333333333333333333333333333333111111111111111111111111111111111111111111111111111
        3333311133333333311111111333333333333333333333333333333333333111333333333333333333333333333333333333333333333311111111111111111111111111111111111111111113311111
        3333111133333311111111113333333333333333333333333333333333331111333333333333333333333333333333333333333333333333111111111111111111111111111111111111111333333111
        3331111113311111111113333333333333333333333333333333333333311111333333333333333333333333333333333333333333333333311111111111111111111111111111111111111333333111
        3311111111111111111333333333333333333333333333333333333333111111333333333333333333333333333333333333333333333333331111111111111111111111111111111111333333331111
        1111111111111111333333333333333333333333333333333333333311111111333333333333333333333333333333333333333333333333333311111111111111111111111111111113333333311111
        1111113111111333333333333333333333333333333333333333331111111113333333333333333333333333333333333333333333333333333333311111111111111111111111111333333333311111
        1111333333333333333333333331111111111111133333333331111111111133333333333333333333333333333333333333333333333333333333333333331111111111111113333333333333311111
        1113333333333333333333333111111111111111111111111111111111113333311113333333333333333333333333333333333333333333333333333333333333333333333333333333333333111111
        3333333333333333333333331111111111111111111111111111111113333331111113333333333333333333333333333333333333333333333333333333333333333333333333333333333333111111
        3333333333333333333333311111111111111111111111111111113333333111111113333333333333333333333333333333333333333333333333333333333333333333333333333333333311111111
        3333333333333333333333111111111111111111111111111111133333333111111113333333333333333333111111111133333333333333333333333333333333333333333333333333333311111111
        3333333333333333333331111111111111111111111111111111133333333111111113333333333333333331111111111133333333333333333333333333333333333333333333333333333311111111
        3333333333333333333331111111111133333111111111111111133333333333111113333333333333333311111111111133333333333333333333333333333333333333333333333333333311111111
        3333333333333333333311111111113333333333111111111111133333333333111113333333333333333111111111111133333333333333333333333333333333333333333333333333333311111111
        3333333333333333333311111111333333333333333111111111133333333333111133333333333333333111111111111133333333333333333333333333333333333333333333333333333311111111
        3333333333333333331111111113333333333333333111111111133333333333111133333333333333331111111111111133333333333333333333333333333333333333333333333333333311111111
        3333333333333333331333333333333333333333333111111111133333333333111133333333333333311111111333111133333333333333333333333333333333333333333311111333333311111111
        3333333333333333333333333333333333333333333111111111333333333333111131111113333333311111111333111133333333333333333333333333333333333333331111111133333311111111
        3333333333333333333333333333333333333333333111111111333333333333111111111111333333311111113331111333333333333333333333333333333333333333331111111113333311111111
        3333333333333333333333333333333333333333333111111111333333333333111111111111333333111111113111111333333333333333333333333333333333333333331111111111333311111111
        3333333333333333333333333333333333333333333111111111333333333333111111111111333333111111111111111333333333333333333333333333333333333333331111111111333331111111
        3333333333333333333333333333333333333333333111111111333333333333111111111111333333111111111111111333333333333333333333333333333333333333331111111111333333111111
        3333333333333333333333333333333333333333333111111111333333333333111111111111333333111111111111113333333333333333333333333333333333333333331111111111333333111111
        3333333333333333333333333333333333333333333111111111333333333333111113311111333333111111111113333333333333333333333333333333333333333333331111111111333333111111
        3333333333333333333333333333333333333333333111111111333333333333111133311111333333111111113333333333333333333333333333333333333333333333331111111333333331111111
        3333333333333333333333333333333333333333333111111111333333333333111333331111333333111111133333333333333333333333333333333333333333333333331111111133333331111111
        3333333333333333333333333333333333333333333111111113333333333331111333331111333333111111133333333333333333333333333333333333333333333333331111111133333311111111
        3333333333333333333333333333333333333333333111111113333333333331111333331111333331111111133333333333333333333333333333333333333333333333331111111113333111111111
        3333333333333333333333333333333333333333331111111113333333333331111333311111333311111111133333333333111333333333333333333333333333333333333111111111311111111111
        3333333333333333333333333333333333333333331111111113333333333331111333311111333111111111113333333331111333333333333333333333333333333333333311111111111111111111
        3333333333333333333333333333333333333333331111111113333333333331111333311113331111111111113333333311111333333333333333333333333113333333333311111111111111111111
        3333333333333333333333333333333333333333331111111113333333333311111333331113311111111111111111111111111333333333333333333333331111333333333331111111111111111111
        3333333333333333333333333333333333333333331111111113333333333311111333331111111111111111111111111111111333333333333333333333311111333333333331111111111111111111
        3333333333333333333333333333333333333333311111111113333333333311111333331111111111133111111111111111111333333333333333333333311111333333333333111111111111111111
        3333333333333333333333333333333333333333311111111113333333333111111333331111111111133111111111111111113333333331113333333333311111333333333333311111111111111111
        3333333333333333333333333333333333333333311111111111333333333111111333111111111111333331111111111111133333333311113333333333311111333333333333333111111111111111
        3333333333333333333333333333333333333333111111111111333333311111111333111111111113333333333333333333333333333311113333333333111111333333333333333111111111111111
        3333333333333333333333333333333333333333111111111111113333311111111333111333333333333333333333333333333333333111113333333333111111333333333333333331111111111111
        3333333333333333333333333333333333333331111111111111111133311133333333333333333333333333333333333333333333333111133333333331111111333333333333333333111111111111
        3333333333333333333333333333333333333331111111111111111133333333333333333333333333333333333333333333333333333111133333333331111111333333333333333333331111111111
        3333333333333333333333333333333333333331111111111111111113333333333333333333333333333333333333333333333333333111133333333331111111333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333111333333333331111111333333333333333333333333333333
        3111333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111333333333311111111333333333333333333333333333333
        3111333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111333333333311111113333333333333333333333331113333
        3111333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311111333333333111111113333333333333333331113331113333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311113333333333111111113333333333333333331113331113333
        3333333311133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333111113333333333111111113333333333333333331113333333333
        3333333311133333333333333333333333333333333111111111133333333333333333333333333333333333333333333333333333111113333333333111111113333333333333333333333333333333
        3333333311133333333333333333333333333333111111111111111113333333333333333331111113333333333333333333333333111113333333333111111133333333333333333333333333333311
        3333333333333333333333333333333333333331111111111111111111133333333333333311111111333333333333311111111331111113333333333111111133333333333333331113333333331111
        1133333333333333333333333333333333333311111111111111111111113333333333333111111111133333333333111111111331111133333333333111111133333333333333331113333333311111
        1111333333333333333333333333333333333311111111111111111111113333333333111111111111133333333331111111111111111133333333331111111133333333333333331113333111111111
        1111113333333333333333333333333333333311111111111111111111113333333333111111333111133333333331111111111111111133333333331111111333333333333333333333331111111111
        1111111333333333333333333333333333333311111111333333311111113333333331111113333311133333333311111333111111111133333333331111111333333333333333333333331111111111
        1111111113333333333333333333333333333111111113333333333111113333333311111113333311133333333111113333331111111333333333311111111333333333333333333333331111111111
        1111111111133333333333333333333333333111111133333333333333333333333311111133333311133333333111133333333111111333333333111111113333333333333333333333311111111111
        1113331111113333333333333333333333333111111133333333333333333333333111111133333311133333331111133333333311111333333333111111113333333333333333333333311111111111
        1333333111113333333333333333333333333111111133333333333333333333331111111133333111133333331111333333333311111333333333111111113333333333333333333333311111111111
        1333333311113333333333333333333333333111111133333333333333333333331111111133333111133333311111333333333311111333333333111111113333333333333333333333311111111111
        1333333331111333333333333333333333333111111133333333333333333333331111111133333111133333311111333333333111111333333333111111133333333333333333333333311111111111
        1133333331111333333333333333333333333311111113333333333333333333331113111133333111333333111111333333331111111333333333111111133333333333333333333333311111111111
        1133333331111333333333333333333333333311111113333333333333333333333333111133333111333331111111333333331111111333333333111111133333333333333333333333331111111111
        1133333331111333333333333333333333331111111111111111113333333333333333111133333111333331111111333333331111111333333333111113333333333333333333333333331111111111
        1333333331111333333333333333333333311111111111111111113333333333333333111133333111333311111111133333311111111133333333111333333333333333333333333333333111111111
        3333333331111333333333333333333331111111111111111111113333333333333333111333333111133111113111113333111111111111113333333333333333333333333333333333333111111111
        3333333311111333333333333333333311111111111111111111133333333333333333111333333111111111113311113331111111111111113333333333333333333333333333333333333311111111
        3333333111113333333333333333333111111111111111111111133333333333333333111333333111111111133331111111111333111111113333333333333333333333333333333333333311111111
        3333331111113311111333333333333111111111111133333333333333333333333333111333333311111113333331111111113333111111133333333333333333333333333333333333333111111111
        3333331111133311111333333333331111111111133333333333333333333333333333333333333333333333333333111111113333111133333333333333333333333333333333333333333111111111
        3331111111333311111333333333331111111111333333333333333333333111113333333333333333333333333333333333333333111133333333333333333333333333333111111111111111111111
        1111111113333333333333333333331111111113333333333333333333333111111113333333333333333333333333333333333333333333333331111333333333333333331111111111111111111111
        1111111333333333333333333333311111111333333333333333333333331111111113333333333333333333333333333333333333333333333311111113333333333333311111111111111111111111
        1111113333311113333333333333311111111333333333333333333333311111111113333333333333333333333333333333333333333333333311111113333333333333111111111111111111111111
        1111113311111111133333333333311111113333333333333333333333111111111113333333333333333333333333333333333333333333333311111113333333333331111111111111111111111111
        1111113111111111113333333333311111113333333333333333333333111111111133333333333333333333333333333333333333333333333311111113333333333331111111111111111111111111
        1111111111111111111333333333311111111333333333333333333311111111111133333333333333333333333333333333333333333333333311111113333333333311111111111111111111111111
        1111111111111111111133333333311111111133333333333333333111111111111133333333333333333333333333333333333333333333333311111113333333333111111111111111111111111133
        1111111111111111111133333333331111111111113333333333111111111111111333333333333333333333333333333333333333333333333311111133333333331111111111111111111111111133
        1111111111111111111113333333331111111111111111111111111111111111113333333333333333333333333333333333333333333333333333333333333333311111111111111111111111111133
        1111111111111111111111133333333111111111111111111111111111111111133333333333333333333333333333333333333333333333333333333333333333311111111111111111111111111333
        1111111111111111111111113333333311111111111111111111111111111111333333333333333333333333333333333333333333333333333333333333333333311111133311111111111111111333
        1111111111111111111111113333333333111111111111111111111111111113333333333333333333333333333333333333333333333333333333333333333333111111133311333111111111111333
        1111111111111133311111113333333333111111111111111111111111111333333333333333333333333333333333333333333333333333333333333333333333111111133311333111111111111333
        1111111111111133311111113333333333311111111111111111111111133333333333333333333333333333333333333333333333333333333333333333333333111111111111333113331111111333
        1111111111111133313331113333333333333311111111111111111133333333333333333333333333333333333333333333333333333333333333333333333333111111111111111113333111111333
        1111111111111113313331113333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111333111111113333111111333
        1111111111111111113331111333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111333111333113333331111333
        1111111111331111111111111133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111333111333333333333111133
        1111111113331111111133311133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111111111333333333333111133
        3311111113331111333133311133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111111111333333333333111133
        3331111133333133333133311133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111111111133333333333311133
        3331111333333333333111111113333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311111111113331133333333333311133
        3331111333333333333331111113333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311111111113333333333333333311133
        3331113333333333333331111113333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311111111113333333333333333311133
        3333113333333333333331111113333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333331111111311113333333333333333311133
        3333133333333333333331111111333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311111113311111333333333333333111133
        3333133333333333333331111111333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333311111113311111333333333333331111133
        3333113333333333333311111111333333333333333333333333333333333333333333333333333333333333333311111111111133333333333333333311111111113311111133333333333311111133
        3333113333333333333111111111333333333333333333333333333333333333333333333333333333333333331111111111111111133333333333331111111133333311111111333333333311111333
        3333111333333333333111111111133333333333333333333331111111111133333333333333333333333333331111111111111111113333333331111111111333333111111111111111131111113333
        3333311113333333311111111111133333333333333331111111111111111113333333333333333333333333111111111111111111111111111111111111113333333111111111111111111111133333
        3333311111111111111111111111111333333333333111111111111111111111133333333333333333333331111111111111111111111111111111111111111111111111111111111111111111133333
        3333311113333333333333113331111111111111111111111111111111111111113333333333333333333331111111111111111111111111111111111111111111111111111111111111111113333333
        3333313333333333333333113331111111111111111111111111111111111111113333333333333333333331111111111111111111111111111111111111111111111111111111111111113333333333
        `, SpriteKind.Player)
    while (!(controller.anyButton.isPressed())) {
        pause(100)
    }
    game.over(true)
}
function startCountdown () {
    info.startCountdown(40)
}
function maybeLoadAMap (columnChange: number, rowChange: number) {
    if (Math.constrain(columnChange + currentMapCol, 0, mapMap[0].length - 1) != currentMapCol || Math.constrain(rowChange + currentMapRow, 0, mapMap.length - 1) != currentMapRow) {
        currentMapCol += columnChange
        currentMapRow += rowChange
        loadMap(currentMapCol, currentMapRow)
        if (columnChange == -1) {
            thePlayer.right = 158
        } else if (columnChange == 1) {
            thePlayer.left = 2
        } else if (rowChange == -1) {
            thePlayer.bottom = 118
        } else {
            thePlayer.top = 2
        }
    }
}
function updateNapPoint () {
    if (spawnColumn != currentMapCol || spawnRow != currentMapRow) {
        spawnColumn = currentMapCol
        spawnRow = currentMapRow
        napPointSet = sprites.create(img`
            .111111111111111111111111111111111111111111111111111111.
            11111111111111111111111111111111111111111111111111111111
            11311311311331111331113311333131131333111133133313331311
            11331313131313111313131131131133131131111131131111311311
            11313313331331111331131131131131331131111113133111311111
            11311313131311111311113311333131131131111133133311311311
            11111111111111111111111111111111111111111111111111111111
            .111111111111111111111111111111111111111111111111111111.
            `, SpriteKind.Decoration)
        napPointSet.bottom = 115
        napPointSet.lifespan = 1000
    }
}
let napPointSet: Sprite = null
let THE_END: Sprite = null
let tempY = 0
let currentScript: string[] = []
let tony: Sprite = null
let newNPC: Sprite = null
let dozer: Sprite = null
let spawnLocation: tiles.Location = null
let eggSign: Sprite = null
let overlappingEgg: Sprite = null
let currentMapCol = 0
let inventory = ""
let list: string[] = []
let spawnColumn = 0
let spawnRow = 0
let mapMap: tiles.WorldMap[][] = []
let currentMapRow = 0
let thePlayer: Sprite = null
startCountdown()
scene.setBackgroundColor(3)
thePlayer = sprites.create(img`
    . . 3 . . . . . . . . 3 . . 
    . 3 1 3 . . . . . . 3 1 3 . 
    . 3 3 1 3 . . . . 3 1 3 3 . 
    . 3 3 1 3 3 3 3 3 3 1 3 3 . 
    . 3 1 1 1 1 1 1 1 1 1 1 3 . 
    . 3 1 1 1 1 1 1 1 1 1 1 3 . 
    . 3 1 1 1 3 1 1 1 1 3 1 3 . 
    3 3 3 3 3 1 1 1 3 1 1 1 3 3 
    . 3 1 1 1 1 1 3 3 3 1 3 . . 
    . . 3 3 3 3 1 1 1 1 1 3 3 . 
    . . . 3 1 1 1 1 1 1 3 3 . . 
    . . . 3 1 3 1 1 1 1 3 . . . 
    . . . 3 1 3 1 1 1 1 3 . . . 
    . . . 3 1 1 1 1 1 1 3 . . . 
    . . . . 3 1 3 3 1 3 . . . . 
    . . . . 3 3 3 3 3 3 . . . . 
    . . . . . 3 . . 3 . . . . . 
    `, SpriteKind.Player)
thePlayer.z = 5
controller.moveSprite(thePlayer)
currentMapRow = 0
currentMapRow += 0
mapMap = [
[tiles.createMap(tilemap`level25`), tiles.createMap(tilemap`level26`), tiles.createMap(tilemap`level27`)],
[tiles.createMap(tilemap`level20`), tiles.createMap(tilemap`level8`), tiles.createMap(tilemap`level14`)],
[tiles.createMap(tilemap`level24`), tiles.createMap(tilemap`level2`), tiles.createMap(tilemap`level28`)],
[tiles.createMap(tilemap`level23`), tiles.createMap(tilemap`level7`), tiles.createMap(tilemap`level29`)],
[tiles.createMap(tilemap`level22`), tiles.createMap(tilemap`level10`), tiles.createMap(tilemap`level30`)],
[tiles.createMap(tilemap`level19`), tiles.createMap(tilemap`level11`), tiles.createMap(tilemap`level16`)],
[tiles.createMap(tilemap`level21`), tiles.createMap(tilemap`level17`), tiles.createMap(tilemap`level18`)]
]
spawnRow = 0
spawnColumn = 0
loadMap(2, 5)
tiles.placeOnRandomTile(thePlayer, assets.tile`myTile31`)
game.onUpdate(function () {
    if (thePlayer.left < 2) {
        maybeLoadAMap(-1, 0)
    } else if (thePlayer.top < 2) {
        maybeLoadAMap(0, -1)
    } else if (thePlayer.right > 158) {
        maybeLoadAMap(1, 0)
    } else if (thePlayer.bottom > 118) {
        maybeLoadAMap(0, 1)
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.NPC)) {
        if (spriteutils.distanceBetween(thePlayer, value) < 30) {
            startTalkin(value)
        }
    }
})
game.onUpdate(function () {
    if (overlappingEgg && !(spriteutils.isDestroyed(overlappingEgg)) && !(thePlayer.overlapsWith(overlappingEgg))) {
        overlappingEgg.setImage(img`
            ..3333.3333.....
            .31111311113....
            3111113111113...
            3111113111113...
            3111113111113...
            3111113111113...
            .33333333333....
            3111111111113...
            3111111111113...
            3111111111113...
            3111111111113...
            3111111111113...
            3111111111113...
            .31111111113....
            .31111111113....
            ..311111113.....
            ...3333333......
            .....3133..3333.
            .....31113311113
            ......331111333.
            ........3333....
            `)
        tiles.placeOnTile(overlappingEgg, tiles.locationOfSprite(overlappingEgg))
        eggSign.destroy()
    }
})
game.onUpdateInterval(1000, function () {
    for (let value of sprites.allOfKind(SpriteKind.NPC)) {
        if (sprites.readDataString(value, "name") == "Charles") {
            value.setVelocity(0 - value.vx, 0)
            value.image.flipX()
        }
    }
})
