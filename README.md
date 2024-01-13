# Phaser 3 Universal LPC Character

## (Under development)
Character Spritesheet based on Universal-LPC-Spritesheet for Phaser 3.

It is provided as `Phaser.GameObjects.Sprite`, `Phaser.Physics.Arcade.Sprite` and `Phaser.Physics.Matter.Sprite` GameObjects. Also the animators, input behaviors and the entire spritesheet character variations will be included as a TypeScript Interfaces and methods handling.

## How to use

``` bash
# install dependencies
npm i
# or
yarn

# start
npm run dev
# or
yarn dev

# build
npm run build
# or
yarn build

# generate characters spritesheet json map
npm run generate-spritesheet-map
# or
yarn generate-spritesheet-map
```

### Licensing and Attribution (Credits)

This is based in original [Universal LPC Spritesheet Character Generator](https://github.com/Gaurav0/Universal-LPC-Spritesheet-Character-Generator) and [sanderfrenken's LPC Spritesheet Character Generator](https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator) using the awesome [LPC](https://lpc.opengameart.org/) game art assets.

The Liberated Pixel Effort is a collaborative effort from a number of different great artists who helped produce sprites for the project.
**If you wish to use LPC sprites in your project, you will need to credit everyone who helped contribute to the LPC sprites you are using.** See below for how to do this.

All art distributed with this project (all images in the `spritesheets` subdirectory) is licensed under the [GNU GPL 3.0](http://www.gnu.org/licenses/gpl-3.0.html) ([text](gpl-3_0.txt)) and/or [Creative Commons Attribution-ShareAlike 3.0](http://creativecommons.org/licenses/by-sa/3.0/) ([text](cc-by-sa-3_0.txt)) license(s). Some art may be available under other licenses too.

The file `CREDITS.csv` lists the authors, license(s), and links to the original URL(s), for each image in `spritesheets`. **If you generate a sprite using this tool, you must credit all the authors**. You can do this one of two ways:

- Distribute the entire `CREDITS.csv` file along with your project.
- Based on the layers you use the generator outputs the used spritesheets and their credits to a textfield. You are also enabled here to download this text as csv or txt straight to your machiness.

Either way, make sure this credits file is accessible from within your game or app and can be reasonably discovered by users (for instance, show the information on the "Credits" screen directly, or provide a visible link). If you don't want to *show* the entire credits file directly, should include a statement like this on your credits screen:

> Sprites by: Johannes Sjölund (wulax), Michael Whitlock (bigbeargames), Matthew Krohn (makrohn), Nila122, David Conway Jr. (JaidynReiman), Carlo Enrico Victoria (Nemisys), Thane Brimhall (pennomi), bluecarrot16, Luke Mehl, Benjamin K. Smith (BenCreating), ElizaWy, MuffinElZangano, Durrani, kheftel, Stephen Challener (Redshrike), TheraHedwig, Evert, Pierre Vigier (pvigier), Eliza Wyatt (ElizaWy), Johannes Sj?lund (wulax), Sander Frenken (castelonia), dalonedrau, Lanea Zimmerman (Sharm), laetissima, kirts, Mark Weyer, Joe White, Mandi Paugh, William.Thompsonj, Manuel Riecke (MrBeast), Barbara Riviera, thecilekli, Yamilian, Fabzy, Skorpio, Radomir Dopieralski, Emilio J. Sanchez-Sierra, kcilds/Rocetti/Eredah, Cobra Hubbard (BlueVortexGames), DCSS authors, Marcel van de Steeg (MadMarcel), DarkwallLKE, Charles Sanchez (CharlesGabriel), Shaun Williams, Tuomo Untinen (reemax), Stafford McIntyre, PlatForge project, Tracy, Daniel Eddeland (daneeklu), William.Thomsponj, Joshua Taylor, Zi Ye, AntumDeluge, drjamgo@hotmail.com, Lori Angela Nagel (jastiv), gr3yh47, pswerlang, XOR, tskaufma, Inboxninja, Dr. Jamgo, LordNeo
> Sprites contributed as part of the Liberated Pixel Cup project from OpenGameArt.org: http://opengameart.org/content/lpc-collection
> License: Creative Commons Attribution-ShareAlike 3.0 (CC-BY-SA 3.0) <http://creativecommons.org/licenses/by-sa/3.0/>
> Detailed credits: [LINK TO CREDITS.CSV FILE]
