// ─────────────────────────────────────────────────────────────────────────────
// MONSTERS
//
// SISTEMA DE DESBLOQUEIO:
//   - Ao atingir o minCB de um tier, 2 monstros aleatórios desse tier são
//     liberados automaticamente (sorteados na primeira vez que o CB é atingido)
//   - Os demais são comprados com PAM Coins (preço por tier)
//   - Monstros comprados ficam permanentemente na lista
//   - slayerReq: true = jogo bloqueia o ataque sem estar em task
// ─────────────────────────────────────────────────────────────────────────────

const WIKI = 'https://oldschool.runescape.wiki/images'

export const TIERS = [
  { id: 'turael',   label: 'Turael',   minCB: 1,  maxCB: 39,   unlockCost: 80,  color: '#3B6D11', bg: '#EAF3DE', border: '#97C459' },
  { id: 'mazchna',  label: 'Mazchna',  minCB: 40, maxCB: 69,   unlockCost: 200, color: '#854F0B', bg: '#FAEEDA', border: '#EF9F27' },
  { id: 'vannaka',  label: 'Vannaka',  minCB: 70, maxCB: 89,   unlockCost: 400, color: '#7A1F1F', bg: '#FAECE7', border: '#D85A30' },
  { id: 'chaeldar', label: 'Chaeldar', minCB: 90, maxCB: 9999, unlockCost: 700, color: '#2a1a6e', bg: '#ede8ff', border: '#8B6BD4' },
]

export const BOSS_TIER = {
  id: 'boss', label: 'Boss', unlockCost: 500,
  color: '#1a1a1a', bg: '#f0f0f0', border: '#888',
}

export const MONSTERS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // TURAEL — CB 1–39  (18 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'chickens', name: 'Chickens', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 200, bonusAmount: 10,
    location: 'Lumbridge Farm',
    desc: 'Pega feathers para flechas. Starter clássico.',
    img: `${WIKI}/Chicken.png`, slayerReq: false,
  },
  {
    id: 'cows', name: 'Cows', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 150, bonusAmount: 10,
    location: 'Lumbridge Cow Field',
    desc: 'Cowhide para Crafting, carne para comida.',
    img: `${WIKI}/Cow.png`, slayerReq: false,
  },
  {
    id: 'rats', name: 'Giant Rats', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 250, bonusAmount: 8,
    location: 'Lumbridge Cellar / Varrock Sewers',
    desc: 'Os mais fáceis do jogo. Rápidos para initicar.',
    img: `${WIKI}/Giant_rat.png`, slayerReq: false,
  },
  {
    id: 'goblins', name: 'Goblins', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,
    location: 'Lumbridge / Goblin Village',
    desc: 'Drops moedas e goblin armor.',
    img: `${WIKI}/Goblin.png`, slayerReq: false,
  },
  {
    id: 'bats', name: 'Bats', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,
    location: 'Lumbridge Swamp Caves',
    desc: 'Fáceis e acessíveis.',
    img: `${WIKI}/Bat.png`, slayerReq: false,
  },
  {
    id: 'wolves', name: 'Wolves', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 175, bonusAmount: 9,
    location: 'White Wolf Mountain / Taverley',
    desc: 'Drops wolf bones para Prayer.',
    img: `${WIKI}/Wolf.png`, slayerReq: false,
  },
  {
    id: 'scorpions', name: 'Scorpions', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 175, bonusAmount: 9,
    location: 'Dwarven Mine / Al Kharid',
    desc: 'Drops uncut gems raramente.',
    img: `${WIKI}/Scorpion.png`, slayerReq: false,
  },
  {
    id: 'skeletons', name: 'Skeletons', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 150, bonusAmount: 9,
    location: 'Edgeville Dungeon / Stronghold',
    desc: 'Drops coins e bones para Prayer.',
    img: `${WIKI}/Skeleton_(large).png`, slayerReq: false,
  },
  {
    id: 'ghosts', name: 'Ghosts', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 175, bonusAmount: 8,
    location: 'Port Phasmatys / Draynor Manor',
    desc: 'Drops various loot. Requer Ghostspeak amulet.',
    img: `${WIKI}/Ghost.png`, slayerReq: false,
  },
  {
    id: 'bears', name: 'Bears', tier: 'turael', minCB: 8,
    coinsPerKill: 1, bonusEvery: 150, bonusAmount: 10,
    location: 'East of Varrock / Ranging Guild',
    desc: 'Drops bear fur para Crafting.',
    img: `${WIKI}/Bear.png`, slayerReq: false,
  },
  {
    id: 'dogs', name: 'Dogs', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,
    location: 'Stronghold of Security',
    desc: 'Drops bones e coins.',
    img: `${WIKI}/Dog.png`, slayerReq: false,
  },
  {
    id: 'minotaurs', name: 'Minotaurs', tier: 'turael', minCB: 10,
    coinsPerKill: 1, bonusEvery: 100, bonusAmount: 12,
    location: 'Stronghold of Security (Anarchy)',
    desc: 'Dropam iron arrows — ótimo para Ranged iron.',
    img: `${WIKI}/Minotaur.png`, slayerReq: false,
  },
  {
    id: 'giant_spiders', name: 'Giant Spiders', tier: 'turael', minCB: 3,
    coinsPerKill: 1, bonusEvery: 150, bonusAmount: 8,
    location: 'Stronghold of Security',
    desc: 'Rápidos de matar, boa exp.',
    img: `${WIKI}/Giant_spider_(level_2).png`, slayerReq: false,
  },
  {
    id: 'monkeys', name: 'Monkeys', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,
    location: 'Ape Atoll / Karamja',
    desc: 'Drops bones e monkey bones para Prayer.',
    img: `${WIKI}/Monkey.png`, slayerReq: false,
  },
  {
    id: 'cave_bugs', name: 'Cave Bugs', tier: 'turael', minCB: 1,
    coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,
    location: 'Lumbridge Swamp Caves',
    desc: 'Requer 7 Slayer. Drops herbs.',
    img: `${WIKI}/Cave_bug.png`, slayerReq: true,
  },
  {
    id: 'crawling_hands', name: 'Crawling Hands', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 150, bonusAmount: 10,
    location: 'Slayer Tower (ground floor)',
    desc: 'Requer 5 Slayer. Drops ruby e diamond rings.',
    img: `${WIKI}/Crawling_hand.png`, slayerReq: true,
  },
  {
    id: 'lizards', name: 'Lizards', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 150, bonusAmount: 9,
    location: 'Kharidian Desert',
    desc: 'Requer 22 Slayer. Precisam de ice cooler para matar.',
    img: `${WIKI}/Desert_lizard.png`, slayerReq: true,
  },
  {
    id: 'dwarves', name: 'Dwarves', tier: 'turael', minCB: 5,
    coinsPerKill: 1, bonusEvery: 175, bonusAmount: 9,
    location: 'Dwarven Mine / Ice Mountain',
    desc: 'Drops pickaxes e mithril ores raramente.',
    img: `${WIKI}/Dwarf.png`, slayerReq: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAZCHNA — CB 40–69  (16 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'hill_giants', name: 'Hill Giants', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 15,
    location: 'Edgeville Dungeon',
    desc: 'Big bones para Prayer. Ótimo para iron.',
    img: `${WIKI}/Hill_giant.png`, slayerReq: false,
  },
  {
    id: 'hobgoblins', name: 'Hobgoblins', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12,
    location: 'Taverley Dungeon / Crafting Guild',
    desc: 'Drops uncut gems e limpet cords.',
    img: `${WIKI}/Hobgoblin.png`, slayerReq: false,
  },
  {
    id: 'moss_giants', name: 'Moss Giants', tier: 'mazchna', minCB: 40,
    coinsPerKill: 3, bonusEvery: 50, bonusAmount: 20,
    location: 'Varrock Sewers / Crandor',
    desc: 'Drops ranarr seeds ocasionalmente.',
    img: `${WIKI}/Moss_giant.png`, slayerReq: false,
  },
  {
    id: 'ice_giants', name: 'Ice Giants', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 75, bonusAmount: 15,
    location: 'Asgarnian Ice Dungeon / White Wolf Mountain',
    desc: 'Drops big bones e rune items raramente.',
    img: `${WIKI}/Ice_giant.png`, slayerReq: false,
  },
  {
    id: 'ice_warriors', name: 'Ice Warriors', tier: 'mazchna', minCB: 45,
    coinsPerKill: 2, bonusEvery: 75, bonusAmount: 15,
    location: 'Asgarnian Ice Dungeon',
    desc: 'Drops mithril items.',
    img: `${WIKI}/Ice_warrior.png`, slayerReq: false,
  },
  {
    id: 'zombies_mid', name: 'Zombies', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12,
    location: 'Stronghold of Security / Draynor Sewers',
    desc: 'Drops rune items raramente.',
    img: `${WIKI}/Zombie_(blue).png`, slayerReq: false,
  },
  {
    id: 'ogres', name: 'Ogres', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 13,
    location: 'Gu\'Tanoth / Jiggig',
    desc: 'Drops big bones e coins.',
    img: `${WIKI}/Ogre.png`, slayerReq: false,
  },
  {
    id: 'bandits', name: 'Bandits', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 75, bonusAmount: 15,
    location: 'Kharidian Desert Bandit Camp',
    desc: 'AFK infinito com Zamorak/Saradomin item equipado.',
    img: `${WIKI}/Bandit_(Kharidian_Desert).png`, slayerReq: false,
  },
  {
    id: 'lesser_demons', name: 'Lesser Demons', tier: 'mazchna', minCB: 50,
    coinsPerKill: 3, bonusEvery: 50, bonusAmount: 20,
    location: 'Karamja Volcano / Catacombs',
    desc: 'Drops rune med helm. Excelente para iron.',
    img: `${WIKI}/Lesser_demon.png`, slayerReq: false,
  },
  {
    id: 'banshees', name: 'Banshees', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12,
    location: 'Slayer Tower (ground floor)',
    desc: 'Requer 15 Slayer. Requer earplugs/muffs.',
    img: `${WIKI}/Banshee.png`, slayerReq: true,
  },
  {
    id: 'cave_crawlers', name: 'Cave Crawlers', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 75, bonusAmount: 15,
    location: 'Fremennik Slayer Dungeon',
    desc: 'Requer 10 Slayer. Drops herbs e poison.',
    img: `${WIKI}/Cave_crawler.png`, slayerReq: true,
  },
  {
    id: 'wall_beasts', name: 'Wall Beasts', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12,
    location: 'Lumbridge Swamp Caves',
    desc: 'Requer 35 Slayer. Requer lantern.',
    img: `${WIKI}/Wall_beast.png`, slayerReq: true,
  },
  {
    id: 'rock_crabs', name: 'Rock Crabs', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12,
    location: 'Rellekka Coast',
    desc: 'Alta HP, baixo nível efetivo. Ótimo para AFK combat.',
    img: `${WIKI}/Rock_crab.png`, slayerReq: false,
  },
  {
    id: 'flesh_crawlers', name: 'Flesh Crawlers', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 13,
    location: 'Stronghold of Security (Catacomb of Famine)',
    desc: 'Drops herbs incluindo ranarr.',
    img: `${WIKI}/Flesh_crawler.png`, slayerReq: false,
  },
  {
    id: 'pirates', name: 'Pirates', tier: 'mazchna', minCB: 40,
    coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12,
    location: 'Brimhaven / Karamja',
    desc: 'Drops coins e black items.',
    img: `${WIKI}/Pirate.png`, slayerReq: false,
  },
  {
    id: 'kalphite_workers', name: 'Kalphite Workers', tier: 'mazchna', minCB: 45,
    coinsPerKill: 2, bonusEvery: 75, bonusAmount: 15,
    location: 'Kalphite Lair',
    desc: 'Drops herbs e seeds.',
    img: `${WIKI}/Kalphite_Worker.png`, slayerReq: false,
  },
  {
    id: 'jungle_horrors', name: 'Jungle Horrors', tier: 'mazchna', minCB: 45,
    coinsPerKill: 2, bonusEvery: 75, bonusAmount: 15,
    location: 'Ape Atoll',
    desc: 'Requer Cabin Fever. Drops various items.',
    img: `${WIKI}/Jungle_horror.png`, slayerReq: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VANNAKA — CB 70–89  (16 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'fire_giants', name: 'Fire Giants', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 50, bonusAmount: 25,
    location: 'Waterfall Dungeon / Catacombs',
    desc: 'Rune drops + seeds. Um dos melhores para iron.',
    img: `${WIKI}/Fire_giant.png`, slayerReq: false,
  },
  {
    id: 'blue_dragons', name: 'Blue Dragons', tier: 'vannaka', minCB: 70,
    coinsPerKill: 5, bonusEvery: 25, bonusAmount: 30,
    location: 'Taverley Dungeon / Heroes Guild',
    desc: 'Dragon bones + Blue dragonhide. Essencial para Crafting.',
    img: `${WIKI}/Blue_dragon.png`, slayerReq: false,
  },
  {
    id: 'greater_demons', name: 'Greater Demons', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 25, bonusAmount: 25,
    location: 'Brimhaven / Catacombs',
    desc: 'Drops rune full helm e clue scrolls.',
    img: `${WIKI}/Greater_demon.png`, slayerReq: false,
  },
  {
    id: 'black_demons', name: 'Black Demons', tier: 'vannaka', minCB: 75,
    coinsPerKill: 4, bonusEvery: 25, bonusAmount: 25,
    location: 'Taverley Dungeon / Catacombs',
    desc: 'Drops brimstone keys nos Catacombs.',
    img: `${WIKI}/Black_demon.png`, slayerReq: false,
  },
  {
    id: 'iron_dragons', name: 'Iron Dragons', tier: 'vannaka', minCB: 75,
    coinsPerKill: 5, bonusEvery: 20, bonusAmount: 30,
    location: 'Brimhaven Dungeon / Catacombs',
    desc: 'Dragon items e dragonhide.',
    img: `${WIKI}/Iron_dragon.png`, slayerReq: false,
  },
  {
    id: 'steel_dragons', name: 'Steel Dragons', tier: 'vannaka', minCB: 75,
    coinsPerKill: 5, bonusEvery: 20, bonusAmount: 30,
    location: 'Brimhaven Dungeon / Catacombs',
    desc: 'Drops draconic visage raramente.',
    img: `${WIKI}/Steel_dragon.png`, slayerReq: false,
  },
  {
    id: 'dagannoths_cave', name: 'Dagannoths', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 50, bonusAmount: 25,
    location: 'Waterbirth Island / Catacombs',
    desc: 'Drops dagannoth bones e various items.',
    img: `${WIKI}/Dagannoth_(Waterbirth_Island).png`, slayerReq: false,
  },
  {
    id: 'hellhounds', name: 'Hellhounds', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 50, bonusAmount: 25,
    location: 'Taverley Dungeon / Catacombs',
    desc: 'Drops clue scrolls (hard). Slayer exp excelente.',
    img: `${WIKI}/Hellhound.png`, slayerReq: false,
  },
  {
    id: 'cave_horrors', name: 'Cave Horrors', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 40, bonusAmount: 28,
    location: 'Mos Le\'Harmless',
    desc: 'Requer 58 Slayer. Drops Black Mask!',
    img: `${WIKI}/Cave_horror.png`, slayerReq: true,
  },
  {
    id: 'bloodvelds', name: 'Bloodvelds', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 50, bonusAmount: 25,
    location: 'Slayer Tower / Catacombs',
    desc: 'Requer 50 Slayer. Drops blood runes.',
    img: `${WIKI}/Bloodveld.png`, slayerReq: true,
  },
  {
    id: 'basilisks', name: 'Basilisks', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 40, bonusAmount: 25,
    location: 'Fremennik Slayer Dungeon',
    desc: 'Requer 40 Slayer + mirror shield. Drops Basilisk jaw!',
    img: `${WIKI}/Basilisk.png`, slayerReq: true,
  },
  {
    id: 'cockatrices', name: 'Cockatrices', tier: 'vannaka', minCB: 70,
    coinsPerKill: 3, bonusEvery: 50, bonusAmount: 22,
    location: 'Fremennik Slayer Dungeon',
    desc: 'Requer 25 Slayer + mirror shield.',
    img: `${WIKI}/Cockatrice.png`, slayerReq: true,
  },
  {
    id: 'jellies', name: 'Jellies', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 50, bonusAmount: 25,
    location: 'Fremennik Slayer Dungeon',
    desc: 'Requer 52 Slayer. Drops rune items.',
    img: `${WIKI}/Jelly.png`, slayerReq: true,
  },
  {
    id: 'turoth', name: 'Turoth', tier: 'vannaka', minCB: 70,
    coinsPerKill: 4, bonusEvery: 40, bonusAmount: 26,
    location: 'Fremennik Slayer Dungeon',
    desc: 'Requer 55 Slayer + leaf-bladed weapon.',
    img: `${WIKI}/Turoth.png`, slayerReq: true,
  },
  {
    id: 'kurask', name: 'Kurask', tier: 'vannaka', minCB: 75,
    coinsPerKill: 5, bonusEvery: 30, bonusAmount: 30,
    location: 'Fremennik Slayer Dungeon',
    desc: 'Requer 70 Slayer + leaf-bladed weapon. Drops leaf-bladed sword.',
    img: `${WIKI}/Kurask.png`, slayerReq: true,
  },
  {
    id: 'trolls', name: 'Mountain Trolls', tier: 'vannaka', minCB: 70,
    coinsPerKill: 3, bonusEvery: 50, bonusAmount: 22,
    location: 'Death Plateau / Troll Stronghold',
    desc: 'Drops big bones e clue scrolls.',
    img: `${WIKI}/Mountain_troll.png`, slayerReq: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAELDAR — CB 90+  (14 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'abyssal_demons', name: 'Abyssal Demons', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 6, bonusEvery: 25, bonusAmount: 40,
    location: 'Slayer Tower / Catacombs',
    desc: 'Requer 85 Slayer. Dropam Abyssal Whip e Abyssal Dagger!',
    img: `${WIKI}/Abyssal_demon.png`, slayerReq: true,
  },
  {
    id: 'brutal_black_dragons', name: 'Brutal Black Dragons', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 7, bonusEvery: 15, bonusAmount: 40,
    location: 'Catacombs of Kourend',
    desc: 'Drops Dragon full helm + Dragon platelegs.',
    img: `${WIKI}/Brutal_black_dragon.png`, slayerReq: false,
  },
  {
    id: 'nechryaels', name: 'Nechryaels', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 5, bonusEvery: 25, bonusAmount: 35,
    location: 'Slayer Tower / Catacombs',
    desc: 'Requer 80 Slayer. Drops death runes em massa.',
    img: `${WIKI}/Nechryael.png`, slayerReq: true,
  },
  {
    id: 'dust_devils', name: 'Dust Devils', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 5, bonusEvery: 25, bonusAmount: 30,
    location: 'Smoke Dungeon / Catacombs',
    desc: 'Requer 65 Slayer. Drops Smoke Battlestaff.',
    img: `${WIKI}/Dust_devil.png`, slayerReq: true,
  },
  {
    id: 'gargoyles', name: 'Gargoyles', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 6, bonusEvery: 20, bonusAmount: 35,
    location: 'Slayer Tower',
    desc: 'Requer 75 Slayer + rock hammer. Drops granite maul.',
    img: `${WIKI}/Gargoyle.png`, slayerReq: true,
  },
  {
    id: 'dark_beasts', name: 'Dark Beasts', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 7, bonusEvery: 15, bonusAmount: 45,
    location: 'Mourner Tunnels / Catacombs',
    desc: 'Requer 90 Slayer. Drops Dragon 2h e Dark bow.',
    img: `${WIKI}/Dark_beast.png`, slayerReq: true,
  },
  {
    id: 'smoke_devils', name: 'Smoke Devils', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 6, bonusEvery: 20, bonusAmount: 38,
    location: 'Smoke Devil Dungeon',
    desc: 'Requer 93 Slayer. Drops Occult Necklace!',
    img: `${WIKI}/Smoke_devil.png`, slayerReq: true,
  },
  {
    id: 'wyrms', name: 'Wyrms', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 6, bonusEvery: 25, bonusAmount: 35,
    location: 'Karuulm Slayer Dungeon',
    desc: 'Requer 62 Slayer. Drops Dragon sword e harpoon.',
    img: `${WIKI}/Wyrm.png`, slayerReq: true,
  },
  {
    id: 'drakes', name: 'Drakes', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 7, bonusEvery: 20, bonusAmount: 40,
    location: 'Karuulm Slayer Dungeon',
    desc: 'Requer 84 Slayer. Drops Drake tooth e boots.',
    img: `${WIKI}/Drake.png`, slayerReq: true,
  },
  {
    id: 'hydras', name: 'Hydras', tier: 'chaeldar', minCB: 95,
    coinsPerKill: 8, bonusEvery: 15, bonusAmount: 50,
    location: 'Karuulm Slayer Dungeon',
    desc: 'Requer 95 Slayer. Drops Hydra leather e tail.',
    img: `${WIKI}/Hydra.png`, slayerReq: true,
  },
  {
    id: 'demonic_gorillas', name: 'Demonic Gorillas', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 8, bonusEvery: 15, bonusAmount: 50,
    location: 'Crash Site Cavern',
    desc: 'Drops Ballista components. Requer Monkey Madness II.',
    img: `${WIKI}/Demonic_gorilla.png`, slayerReq: false,
  },
  {
    id: 'rune_dragons', name: 'Rune Dragons', tier: 'chaeldar', minCB: 95,
    coinsPerKill: 8, bonusEvery: 15, bonusAmount: 50,
    location: 'Mount Karuulm',
    desc: 'Drops Draconic visage e rune items. Requer Dragon Slayer II.',
    img: `${WIKI}/Rune_dragon.png`, slayerReq: false,
  },
  {
    id: 'spiritual_mages', name: 'Spiritual Mages', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 7, bonusEvery: 20, bonusAmount: 42,
    location: 'God Wars Dungeon',
    desc: 'Requer 83 Slayer. Drops dragon boots!',
    img: `${WIKI}/Spiritual_mage_(Zamorak).png`, slayerReq: true,
  },
  {
    id: 'aviansies', name: 'Aviansies', tier: 'chaeldar', minCB: 90,
    coinsPerKill: 6, bonusEvery: 25, bonusAmount: 38,
    location: 'God Wars Dungeon (Armadyl)',
    desc: 'Drops adamantite bars e Armadyl components.',
    img: `${WIKI}/Aviansie.png`, slayerReq: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BOSSES  (16 bosses)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'obor', name: 'Obor', tier: 'boss', minCB: 40,
    coinsPerKill: 20, bonusEvery: 5, bonusAmount: 40,
    location: 'Stronghold of Security',
    desc: 'Boss iniciante. Drops Hill Giant Club.',
    img: `${WIKI}/Obor.png`, slayerReq: false,
  },
  {
    id: 'bryophyta', name: 'Bryophyta', tier: 'boss', minCB: 40,
    coinsPerKill: 20, bonusEvery: 5, bonusAmount: 40,
    location: 'Varrock Sewers',
    desc: 'Drops Staff of Nature e Nature Rune tome.',
    img: `${WIKI}/Bryophyta.png`, slayerReq: false,
  },
  {
    id: 'mimic', name: 'The Mimic', tier: 'boss', minCB: 50,
    coinsPerKill: 25, bonusEvery: 3, bonusAmount: 50,
    location: 'Clue Scroll (elite/master)',
    desc: 'Drops Mimic pet e clue loot. Raro de encontrar.',
    img: `${WIKI}/The_Mimic.png`, slayerReq: false,
  },
  {
    id: 'skotizo', name: 'Skotizo', tier: 'boss', minCB: 60,
    coinsPerKill: 40, bonusEvery: 3, bonusAmount: 80,
    location: 'Catacombs of Kourend',
    desc: 'Drops Uncut Onyx e Dark Totem pets.',
    img: `${WIKI}/Skotizo.png`, slayerReq: false,
  },
  {
    id: 'giant_mole', name: 'Giant Mole', tier: 'boss', minCB: 60,
    coinsPerKill: 25, bonusEvery: 10, bonusAmount: 60,
    location: 'Falador Mole Lair',
    desc: 'Drops mole claws/skin → troca por birdhouses.',
    img: `${WIKI}/Giant_Mole.png`, slayerReq: false,
  },
  {
    id: 'barrows', name: 'Barrows Brothers', tier: 'boss', minCB: 70,
    coinsPerKill: 35, bonusEvery: 5, bonusAmount: 80,
    location: 'Barrows, Morytania',
    desc: 'Drops barrows equipment. Ótimo para iron mid-game.',
    img: `${WIKI}/Dharok_the_Wretched.png`, slayerReq: false,
  },
  {
    id: 'kbd', name: 'King Black Dragon', tier: 'boss', minCB: 70,
    coinsPerKill: 30, bonusEvery: 5, bonusAmount: 70,
    location: 'Wilderness (Deep)',
    desc: 'Drops Dragon 2h e Draconic visage. Cuidado com PKers.',
    img: `${WIKI}/King_Black_Dragon.png`, slayerReq: false,
  },
  {
    id: 'sarachnis', name: 'Sarachnis', tier: 'boss', minCB: 70,
    coinsPerKill: 30, bonusEvery: 5, bonusAmount: 80,
    location: 'Forthos Dungeon',
    desc: 'Drops Sarachnis Cudgel + herb seeds em massa.',
    img: `${WIKI}/Sarachnis.png`, slayerReq: false,
  },
  {
    id: 'deranged_archaeologist', name: 'Deranged Archaeologist', tier: 'boss', minCB: 70,
    coinsPerKill: 25, bonusEvery: 5, bonusAmount: 60,
    location: 'Fossil Island',
    desc: 'Drops Brimstone ring components.',
    img: `${WIKI}/Deranged_archaeologist.png`, slayerReq: false,
  },
  {
    id: 'dagannoth_rex', name: 'Dagannoth Rex', tier: 'boss', minCB: 80,
    coinsPerKill: 30, bonusEvery: 5, bonusAmount: 100,
    location: 'Waterbirth Island',
    desc: 'Drops Berserker Ring. Um dos melhores para iron.',
    img: `${WIKI}/Dagannoth_Rex.png`, slayerReq: false,
  },
  {
    id: 'dagannoth_prime', name: 'Dagannoth Prime', tier: 'boss', minCB: 80,
    coinsPerKill: 30, bonusEvery: 5, bonusAmount: 100,
    location: 'Waterbirth Island',
    desc: 'Drops Seers Ring.',
    img: `${WIKI}/Dagannoth_Prime.png`, slayerReq: false,
  },
  {
    id: 'dagannoth_supreme', name: 'Dagannoth Supreme', tier: 'boss', minCB: 80,
    coinsPerKill: 30, bonusEvery: 5, bonusAmount: 100,
    location: 'Waterbirth Island',
    desc: 'Drops Archer Ring.',
    img: `${WIKI}/Dagannoth_Supreme.png`, slayerReq: false,
  },
  {
    id: 'kalphite_queen', name: 'Kalphite Queen', tier: 'boss', minCB: 90,
    coinsPerKill: 35, bonusEvery: 5, bonusAmount: 120,
    location: 'Kalphite Lair',
    desc: 'Drops Dragon 2h e Dragon Chainbody.',
    img: `${WIKI}/Kalphite_Queen.png`, slayerReq: false,
  },
  {
    id: 'zulrah', name: 'Zulrah', tier: 'boss', minCB: 90,
    coinsPerKill: 40, bonusEvery: 5, bonusAmount: 130,
    location: 'Zul-Andra',
    desc: 'Drops Tanzanite fang, Magic fang, Serp helm. Top money maker.',
    img: `${WIKI}/Zulrah.png`, slayerReq: false,
  },
  {
    id: 'vorkath', name: 'Vorkath', tier: 'boss', minCB: 90,
    coinsPerKill: 40, bonusEvery: 5, bonusAmount: 130,
    location: 'Ungael',
    desc: 'Drops Dragonbone necklace e Vorki pet. Requer Dragon Slayer II.',
    img: `${WIKI}/Vorkath.png`, slayerReq: false,
  },
  {
    id: 'alchemical_hydra', name: 'Alchemical Hydra', tier: 'boss', minCB: 95,
    coinsPerKill: 45, bonusEvery: 5, bonusAmount: 150,
    location: 'Karuulm Slayer Dungeon',
    desc: 'Requer 95 Slayer. Drops Hydra\'s claw → Brimstone ring.',
    img: `${WIKI}/Alchemical_Hydra.png`, slayerReq: true,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getActiveTiers(combatLevel) {
  return TIERS.filter(t => combatLevel >= t.minCB)
}

/**
 * Dado um CB, retorna quais tiers ficaram NOVOS (não estavam antes de subir 1 nível).
 * Usado para disparar o sorteio de 2 monstros ao mudar de tier.
 */
export function getNewlyUnlockedTiers(prevCB, newCB) {
  return TIERS.filter(t => prevCB < t.minCB && newCB >= t.minCB)
}

/**
 * Sorteia N monstros aleatórios de um tier para dar ao jogador ao entrar nele.
 * Exclui os que já estão desbloqueados.
 */
export function drawTierStarters(tierId, combatLevel, alreadyUnlocked, count = 2) {
  const pool = MONSTERS.filter(
    m => m.tier === tierId && combatLevel >= m.minCB && !alreadyUnlocked.has(m.id)
  )
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map(m => m.id)
}

/** Monstros compráveis: tier acessível, CB suficiente, não desbloqueado */
export function getBuyableMonsters(combatLevel, unlockedIds) {
  const activeTierIds = new Set([...getActiveTiers(combatLevel).map(t => t.id), 'boss'])
  return MONSTERS.filter(m =>
    activeTierIds.has(m.tier) &&
    combatLevel >= m.minCB &&
    !unlockedIds.has(m.id)
  )
}

export function getTierCost(tierId) {
  if (tierId === 'boss') return BOSS_TIER.unlockCost
  return TIERS.find(t => t.id === tierId)?.unlockCost ?? 200
}

export const TIER_META = {
  turael:   TIERS[0],
  mazchna:  TIERS[1],
  vannaka:  TIERS[2],
  chaeldar: TIERS[3],
  boss:     BOSS_TIER,
}