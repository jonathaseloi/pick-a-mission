// ─────────────────────────────────────────────────────────────────────────────
// MONSTERS
//
// SISTEMA DE DESBLOQUEIO:
//   - Ao atingir o minCB de um tier, 2 monstros aleatórios desse tier são
//     liberados automaticamente
//   - Boss nunca é liberado automaticamente — comprado na Loja
//   - Os demais são comprados na aba Loja com PAM Coins
//   - slayerReq: true = jogo bloqueia o ataque sem task ativa
// ─────────────────────────────────────────────────────────────────────────────

const WIKI_IMG  = 'https://oldschool.runescape.wiki/images'
const WIKI_PAGE = 'https://oldschool.runescape.wiki/w'

export const TIERS = [
  { id: 'cb1',  label: 'CB 1–39',  minCB: 1,  maxCB: 39,   unlockCost: 120, color: '#3B6D11', bg: '#EAF3DE', border: '#97C459' },
  { id: 'cb40', label: 'CB 40–69', minCB: 40, maxCB: 69,   unlockCost: 350, color: '#854F0B', bg: '#FAEEDA', border: '#EF9F27' },
  { id: 'cb70', label: 'CB 70–89', minCB: 70, maxCB: 89,   unlockCost: 700, color: '#7A1F1F', bg: '#FAECE7', border: '#D85A30' },
  { id: 'cb90', label: 'CB 90+',   minCB: 90, maxCB: 9999, unlockCost: 1200, color: '#2a1a6e', bg: '#ede8ff', border: '#8B6BD4' },
]

export const BOSS_TIER = {
  id: 'boss', label: 'Boss', unlockCost: 800, minCB: 1,
  color: '#5a3a0e', bg: '#fdf3e0', border: '#c8a96e',
}

export const MONSTERS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 1–39  (18 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'chickens',      name: 'Chickens',      tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15, img: `${WIKI_IMG}/Chicken_(1).png`,                slayerReq: false, wiki: `${WIKI_PAGE}/Chicken` },
  { id: 'cows',          name: 'Cows',           tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15, img: `${WIKI_IMG}/Cow_(1).png`,                    slayerReq: false, wiki: `${WIKI_PAGE}/Cow` },
  { id: 'rats',          name: 'Giant Rats',     tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Giant_rat.png`,              slayerReq: false, wiki: `${WIKI_PAGE}/Giant_rat` },
  { id: 'goblins',       name: 'Goblins',        tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Goblin.png`,                 slayerReq: false, wiki: `${WIKI_PAGE}/Goblin` },
  { id: 'bats',          name: 'Bats',           tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,  img: `${WIKI_IMG}/Bat.png`,                    slayerReq: false, wiki: `${WIKI_PAGE}/Bat` },
  { id: 'wolves',        name: 'Wolves',         tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Wolf.png`,                   slayerReq: false, wiki: `${WIKI_PAGE}/Wolf` },
  { id: 'scorpions',     name: 'Scorpions',      tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Scorpion.png`,               slayerReq: false, wiki: `${WIKI_PAGE}/Scorpion` },
  { id: 'skeletons',     name: 'Skeletons',      tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Skeleton_(level_21,_1).png`,       slayerReq: false, wiki: `${WIKI_PAGE}/Skeleton` },
  { id: 'ghosts',        name: 'Ghosts',         tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Ghost.png`,                  slayerReq: false, wiki: `${WIKI_PAGE}/Ghost` },
  { id: 'bears',         name: 'Bears',          tier: 'cb1',  minCB: 8,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15, img: `${WIKI_IMG}/Black_bear.png`,                   slayerReq: false, wiki: `${WIKI_PAGE}/Bear` },
  { id: 'dogs',          name: 'Dogs',           tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,  img: `${WIKI_IMG}/Dog.png`,                    slayerReq: false, wiki: `${WIKI_PAGE}/Dog` },
  { id: 'minotaurs',     name: 'Minotaurs',      tier: 'cb1',  minCB: 10, coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15, img: `${WIKI_IMG}/Minotaur.png`,               slayerReq: false, wiki: `${WIKI_PAGE}/Minotaur` },
  { id: 'giant_spiders', name: 'Giant Spiders',  tier: 'cb1',  minCB: 3,  coinsPerKill: 1, bonusEvery: 100, bonusAmount: 15,  img: `${WIKI_IMG}/Giant_spider_(Level_2).png`, slayerReq: false, wiki: `${WIKI_PAGE}/Giant_spider` },
  { id: 'monkeys',       name: 'Monkeys',        tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,  img: `${WIKI_IMG}/Monkey.png`,                 slayerReq: false, wiki: `${WIKI_PAGE}/Monkey` },
  { id: 'cave_bugs',     name: 'Cave Bugs',      tier: 'cb1',  minCB: 1,  coinsPerKill: 1, bonusEvery: 200, bonusAmount: 8,  img: `${WIKI_IMG}/Cave_bug_(level_6).png`,               slayerReq: true,  wiki: `${WIKI_PAGE}/Cave_bug` },
  { id: 'crawling_hands',name: 'Crawling Hands', tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 150, bonusAmount: 10, img: `${WIKI_IMG}/Crawling_Hand_(level_7).png`,          slayerReq: true,  wiki: `${WIKI_PAGE}/Crawling_Hand` },
  { id: 'lizards',       name: 'Lizards',        tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 150, bonusAmount: 9,  img: `${WIKI_IMG}/Lizard.png`,          slayerReq: true,  wiki: `${WIKI_PAGE}/Desert_Lizard` },
  { id: 'dwarves',       name: 'Dwarves',        tier: 'cb1',  minCB: 5,  coinsPerKill: 1, bonusEvery: 175, bonusAmount: 9,  img: `${WIKI_IMG}/Dwarf.png`,                  slayerReq: false, wiki: `${WIKI_PAGE}/Dwarf` },

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 40–69  (16 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'hill_giants',      name: 'Hill Giants',      tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Hill_Giant.png`,                    slayerReq: false, wiki: `${WIKI_PAGE}/Hill_giant` },
  { id: 'hobgoblins',       name: 'Hobgoblins',       tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Hobgoblin.png`,                     slayerReq: false, wiki: `${WIKI_PAGE}/Hobgoblin` },
  { id: 'moss_giants',      name: 'Moss Giants',      tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Moss_giant.png`,                    slayerReq: false, wiki: `${WIKI_PAGE}/Moss_giant` },
  { id: 'ice_giants',       name: 'Ice Giants',       tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Ice_giant.png`,                     slayerReq: false, wiki: `${WIKI_PAGE}/Ice_giant` },
  { id: 'ice_warriors',     name: 'Ice Warriors',     tier: 'cb40', minCB: 45, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Ice_warrior.png`,                   slayerReq: false, wiki: `${WIKI_PAGE}/Ice_warrior` },
  { id: 'zombies_mid',      name: 'Zombies',          tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Zombie_(Level_24).png`,                 slayerReq: false, wiki: `${WIKI_PAGE}/Zombie` },
  { id: 'ogres',            name: 'Ogres',            tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Ogre.png`,                          slayerReq: false, wiki: `${WIKI_PAGE}/Ogre` },
  { id: 'bandits',          name: 'Bandits',          tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Bandit.png`,     slayerReq: false, wiki: `${WIKI_PAGE}/Bandit_(Kharidian_Desert)` },
  { id: 'lesser_demons',    name: 'Lesser Demons',    tier: 'cb40', minCB: 50, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Lesser_demon.png`,                  slayerReq: false, wiki: `${WIKI_PAGE}/Lesser_demon` },
  { id: 'banshees',         name: 'Banshees',         tier: 'cb40', minCB: 40, coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12, img: `${WIKI_IMG}/Banshee.png`,                       slayerReq: true,  wiki: `${WIKI_PAGE}/Banshee` },
  { id: 'cave_crawlers',    name: 'Cave Crawlers',    tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Cave_crawler_(1).png`,                  slayerReq: true,  wiki: `${WIKI_PAGE}/Cave_crawler` },
  { id: 'wall_beasts',      name: 'Wall Beasts',      tier: 'cb40', minCB: 40, coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12, img: `${WIKI_IMG}/Wall_beast.png`,                    slayerReq: true,  wiki: `${WIKI_PAGE}/Wall_beast` },
  { id: 'rock_crabs',       name: 'Rock Crabs',       tier: 'cb40', minCB: 40, coinsPerKill: 2, bonusEvery: 100, bonusAmount: 12, img: `${WIKI_IMG}/Rock_crab_(exposed).png`,                     slayerReq: false, wiki: `${WIKI_PAGE}/Rock_crab` },
  { id: 'flesh_crawlers',   name: 'Flesh Crawlers',   tier: 'cb40', minCB: 40, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Flesh_Crawler.png`,                 slayerReq: false, wiki: `${WIKI_PAGE}/Flesh_crawler` },
  { id: 'kalphite_workers', name: 'Kalphite Workers', tier: 'cb40', minCB: 45, coinsPerKill: 5, bonusEvery: 75, bonusAmount: 50, img: `${WIKI_IMG}/Kalphite_Worker.png`,               slayerReq: false, wiki: `${WIKI_PAGE}/Kalphite_Worker` },
  { id: 'jungle_horrors',   name: 'Jungle Horrors',   tier: 'cb40', minCB: 45, coinsPerKill: 2, bonusEvery: 75,  bonusAmount: 15, img: `${WIKI_IMG}/Jungle_horror.png`,                 slayerReq: false, wiki: `${WIKI_PAGE}/Jungle_horror` },

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 70–89  (16 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'fire_giants',    name: 'Fire Giants',    tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Fire_giant.png`,               slayerReq: false, wiki: `${WIKI_PAGE}/Fire_giant` },
  { id: 'blue_dragons',   name: 'Blue Dragons',   tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Blue_dragon.png`,              slayerReq: false, wiki: `${WIKI_PAGE}/Blue_dragon` },
  { id: 'greater_demons', name: 'Greater Demons', tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Greater_demon.png`,            slayerReq: false, wiki: `${WIKI_PAGE}/Greater_demon` },
  { id: 'black_demons',   name: 'Black Demons',   tier: 'cb70', minCB: 75, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Black_demon.png`,              slayerReq: false, wiki: `${WIKI_PAGE}/Black_demon` },
  { id: 'iron_dragons',   name: 'Iron Dragons',   tier: 'cb70', minCB: 75, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Iron_dragon.png`,              slayerReq: false, wiki: `${WIKI_PAGE}/Iron_dragon` },
  { id: 'steel_dragons',  name: 'Steel Dragons',  tier: 'cb70', minCB: 75, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Steel_dragon.png`,             slayerReq: false, wiki: `${WIKI_PAGE}/Steel_dragon` },
  { id: 'dagannoths',     name: 'Dagannoths',     tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Dagannoth.png`, slayerReq: false, wiki: `${WIKI_PAGE}/Dagannoth` },
  { id: 'hellhounds',     name: 'Hellhounds',     tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Hellhound.png`,                slayerReq: false, wiki: `${WIKI_PAGE}/Hellhound` },
  { id: 'cave_horrors',   name: 'Cave Horrors',   tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Cave_horror_(1).png`,              slayerReq: true,  wiki: `${WIKI_PAGE}/Cave_horror` },
  { id: 'bloodvelds',     name: 'Bloodvelds',     tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Bloodveld.png`,                slayerReq: true,  wiki: `${WIKI_PAGE}/Bloodveld` },
  { id: 'basilisks',      name: 'Basilisks',      tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Basilisk.png`,                 slayerReq: true,  wiki: `${WIKI_PAGE}/Basilisk` },
  { id: 'cockatrices',    name: 'Cockatrices',    tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Cockatrice.png`,               slayerReq: true,  wiki: `${WIKI_PAGE}/Cockatrice` },
  { id: 'jellies',        name: 'Jellies',        tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Jelly.png`,                    slayerReq: true,  wiki: `${WIKI_PAGE}/Jelly` },
  { id: 'turoth',         name: 'Turoth',         tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Turoth_(lv_83).png`,                   slayerReq: true,  wiki: `${WIKI_PAGE}/Turoth` },
  { id: 'kurask',              name: 'Kurask',              tier: 'cb70', minCB: 75, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Kurask.png`,                      slayerReq: true,  wiki: `${WIKI_PAGE}/Kurask` },
  { id: 'trolls',              name: 'Mountain Trolls',     tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Mountain_troll.png`,              slayerReq: false, wiki: `${WIKI_PAGE}/Mountain_Troll` },
  { id: 'aberrant_spectres',   name: 'Aberrant Spectres',   tier: 'cb70', minCB: 70, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Aberrant_spectre.png`,             slayerReq: true,  wiki: `${WIKI_PAGE}/Aberrant_spectre` },
  { id: 'skeletal_wyverns',    name: 'Skeletal Wyverns',    tier: 'cb70', minCB: 72, coinsPerKill: 12, bonusEvery: 40, bonusAmount: 100, img: `${WIKI_IMG}/Skeletal_Wyvern.png`,              slayerReq: true,  wiki: `${WIKI_PAGE}/Skeletal_Wyvern` },

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 90+  (14 monstros)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'abyssal_demons',       name: 'Abyssal Demons',       tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Abyssal_demon.png`,        slayerReq: true,  wiki: `${WIKI_PAGE}/Abyssal_demon` },
  { id: 'brutal_black_dragons', name: 'Brutal Black Dragons', tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Brutal_black_dragon.png`,  slayerReq: false, wiki: `${WIKI_PAGE}/Brutal_black_dragon` },
  { id: 'nechryaels',           name: 'Nechryaels',           tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Nechryael.png`,            slayerReq: true,  wiki: `${WIKI_PAGE}/Nechryael` },
  { id: 'dust_devils',          name: 'Dust Devils',          tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Dust_devil.png`,           slayerReq: true,  wiki: `${WIKI_PAGE}/Dust_devil` },
  { id: 'gargoyles',            name: 'Gargoyles',            tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Gargoyle.png`,             slayerReq: true,  wiki: `${WIKI_PAGE}/Gargoyle` },
  { id: 'dark_beasts',          name: 'Dark Beasts',          tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Dark_beast.png`,           slayerReq: true,  wiki: `${WIKI_PAGE}/Dark_beast` },
  { id: 'smoke_devils',         name: 'Smoke Devils',         tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Smoke_devil.png`,          slayerReq: true,  wiki: `${WIKI_PAGE}/Smoke_devil` },
  { id: 'wyrms',                name: 'Wyrms',                tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Wyrm.png`,                 slayerReq: true,  wiki: `${WIKI_PAGE}/Wyrm` },
  { id: 'drakes',               name: 'Drakes',               tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Drake.png`,                slayerReq: true,  wiki: `${WIKI_PAGE}/Drake` },
  { id: 'hydras',               name: 'Hydras',               tier: 'cb90', minCB: 95, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Hydra.png`,                slayerReq: true,  wiki: `${WIKI_PAGE}/Hydra` },
  { id: 'demonic_gorillas',     name: 'Demonic Gorillas',     tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Demonic_gorilla.png`,      slayerReq: false, wiki: `${WIKI_PAGE}/Demonic_gorilla`,      missionUnlock: 'm2_01' },
  { id: 'rune_dragons',         name: 'Rune Dragons',         tier: 'cb90', minCB: 95, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Rune_dragon.png`,          slayerReq: false, wiki: `${WIKI_PAGE}/Rune_dragon` },
  { id: 'spiritual_mages',      name: 'Spiritual Mages',      tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Spiritual_mage_(Zamorak).png`, slayerReq: true, wiki: `${WIKI_PAGE}/Spiritual_mage`,      missionUnlock: 'm3_02' },
  { id: 'aviansies',            name: 'Aviansies',            tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Aviansie_(level_69).png`,             slayerReq: false, wiki: `${WIKI_PAGE}/Aviansie` },
  { id: 'basilisk_knights',    name: 'Basilisk Knights',    tier: 'cb90', minCB: 90, coinsPerKill: 20, bonusEvery: 20, bonusAmount: 180, img: `${WIKI_IMG}/Basilisk_Knight.png`,              slayerReq: true,  wiki: `${WIKI_PAGE}/Basilisk_Knight`,      missionUnlock: 'm5_16' },

  // ═══════════════════════════════════════════════════════════════════════════
  // BOSSES  (16 bosses — todos comprados na Loja)
  // ═══════════════════════════════════════════════════════════════════════════
  { id: 'obor',                  name: 'Obor',                  tier: 'boss', minCB: 40, coinsPerKill: 60,  bonusEvery: 5, bonusAmount: 250,  img: `${WIKI_IMG}/Obor.png`,                     slayerReq: false, wiki: `${WIKI_PAGE}/Obor` },
  { id: 'bryophyta',             name: 'Bryophyta',             tier: 'boss', minCB: 40, coinsPerKill: 60,  bonusEvery: 5, bonusAmount: 250,  img: `${WIKI_IMG}/Bryophyta.png`,                slayerReq: false, wiki: `${WIKI_PAGE}/Bryophyta`,                missionUnlock: 'm1_03' },
  { id: 'mimic',                 name: 'The Mimic',             tier: 'boss', minCB: 50, coinsPerKill: 80,  bonusEvery: 3, bonusAmount: 300,  img: `${WIKI_IMG}/The_Mimic.png`,                slayerReq: false, wiki: `${WIKI_PAGE}/The_Mimic` },
  { id: 'skotizo',               name: 'Skotizo',               tier: 'boss', minCB: 60, coinsPerKill: 100, bonusEvery: 3, bonusAmount: 400,  img: `${WIKI_IMG}/Skotizo.png`,                  slayerReq: false, wiki: `${WIKI_PAGE}/Skotizo` },
  { id: 'giant_mole',            name: 'Giant Mole',            tier: 'boss', minCB: 60, coinsPerKill: 70,  bonusEvery: 5, bonusAmount: 280, img: `${WIKI_IMG}/Giant_Mole.png`,               slayerReq: false, wiki: `${WIKI_PAGE}/Giant_Mole` },
  { id: 'barrows',               name: 'Barrows Brothers',      tier: 'boss', minCB: 70, coinsPerKill: 90,  bonusEvery: 5, bonusAmount: 350,  img: `${WIKI_IMG}/Dharok_the_Wretched.png`,      slayerReq: false, wiki: `${WIKI_PAGE}/Barrows`,              missionUnlock: 'm2_16' },
  { id: 'kbd',                   name: 'King Black Dragon',     tier: 'boss', minCB: 70, coinsPerKill: 80,  bonusEvery: 5, bonusAmount: 300,  img: `${WIKI_IMG}/King_Black_Dragon.png`,         slayerReq: false, wiki: `${WIKI_PAGE}/King_Black_Dragon`,     missionUnlock: 'm4_17' },
  { id: 'sarachnis',             name: 'Sarachnis',             tier: 'boss', minCB: 70, coinsPerKill: 90,  bonusEvery: 5, bonusAmount: 350,  img: `${WIKI_IMG}/Sarachnis.png`,                slayerReq: false, wiki: `${WIKI_PAGE}/Sarachnis`,            missionUnlock: 'm4_16' },
  { id: 'deranged_archaeologist',name: 'Deranged Archaeologist',tier: 'boss', minCB: 70, coinsPerKill: 70,  bonusEvery: 5, bonusAmount: 280,  img: `${WIKI_IMG}/Deranged_archaeologist.png`,   slayerReq: false, wiki: `${WIKI_PAGE}/Deranged_archaeologist` },
  { id: 'dagannoth_rex',         name: 'Dagannoth Rex',         tier: 'boss', minCB: 80, coinsPerKill: 90,  bonusEvery: 5, bonusAmount: 380, img: `${WIKI_IMG}/Dagannoth_Rex.png`,             slayerReq: false, wiki: `${WIKI_PAGE}/Dagannoth_Rex`,         missionUnlock: 'm4_08' },
  { id: 'dagannoth_prime',       name: 'Dagannoth Prime',       tier: 'boss', minCB: 80, coinsPerKill: 90,  bonusEvery: 5, bonusAmount: 380, img: `${WIKI_IMG}/Dagannoth_Prime.png`,           slayerReq: false, wiki: `${WIKI_PAGE}/Dagannoth_Prime` },
  { id: 'dagannoth_supreme',     name: 'Dagannoth Supreme',     tier: 'boss', minCB: 80, coinsPerKill: 90,  bonusEvery: 5, bonusAmount: 380, img: `${WIKI_IMG}/Dagannoth_Supreme.png`,         slayerReq: false, wiki: `${WIKI_PAGE}/Dagannoth_Supreme`,     missionUnlock: 'm4_09' },
  { id: 'kalphite_queen',        name: 'Kalphite Queen',        tier: 'boss', minCB: 90, coinsPerKill: 100, bonusEvery: 5, bonusAmount: 420, img: `${WIKI_IMG}/Kalphite_Queen.png`,            slayerReq: false, wiki: `${WIKI_PAGE}/Kalphite_Queen` },
  { id: 'zulrah',                name: 'Zulrah',                tier: 'boss', minCB: 90, coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Zulrah_(serpentine).png`,                   slayerReq: false, wiki: `${WIKI_PAGE}/Zulrah`,              missionUnlock: 'm2_04' },
  { id: 'vorkath',               name: 'Vorkath',               tier: 'boss', minCB: 90, coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Vorkath.png`,                  slayerReq: false, wiki: `${WIKI_PAGE}/Vorkath`,             missionUnlock: 'm5_01' },
  { id: 'alchemical_hydra',      name: 'Alchemical Hydra',      tier: 'boss', minCB: 95,  coinsPerKill: 140, bonusEvery: 5, bonusAmount: 550, img: `${WIKI_IMG}/Alchemical_Hydra_(serpentine).png`,          slayerReq: true,  wiki: `${WIKI_PAGE}/Alchemical_Hydra` },
  { id: 'grotesque_guardians',   name: 'Grotesque Guardians',   tier: 'boss', minCB: 75,  coinsPerKill: 100, bonusEvery: 5, bonusAmount: 400, img: `${WIKI_IMG}/Dusk.png`,                                   slayerReq: true,  wiki: `${WIKI_PAGE}/Grotesque_Guardians`, missionUnlock: 'm5_09' },
  { id: 'abyssal_sire',          name: 'Abyssal Sire',          tier: 'boss', minCB: 85,  coinsPerKill: 110, bonusEvery: 5, bonusAmount: 440, img: `${WIKI_IMG}/Abyssal_Sire.png`,                           slayerReq: true,  wiki: `${WIKI_PAGE}/Abyssal_Sire`,        missionUnlock: 'm3_03' },
  // GWD
  { id: 'k_ril_tsutsaroth',      name: "K'ril Tsutsaroth",      tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/K%27ril_Tsutsaroth.png`,                    slayerReq: false, wiki: `${WIKI_PAGE}/K%27ril_Tsutsaroth`,   missionUnlock: 'm5_12' },
  { id: 'general_graardor',      name: 'General Graardor',      tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/General_Graardor.png`,                       slayerReq: false, wiki: `${WIKI_PAGE}/General_Graardor`,     missionUnlock: 'm4_01' },
  { id: 'commander_zilyana',     name: 'Commander Zilyana',     tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Commander_Zilyana.png`,                      slayerReq: false, wiki: `${WIKI_PAGE}/Commander_Zilyana` },
  { id: 'kreearra',              name: "Kree'arra",             tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Kree%27arra.png`,                            slayerReq: false, wiki: `${WIKI_PAGE}/Kree%27arra`,          missionUnlock: 'm4_04' },
  // Slayer bosses
  { id: 'cerberus',              name: 'Cerberus',              tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Cerberus.png`,                               slayerReq: true,  wiki: `${WIKI_PAGE}/Cerberus`,              missionUnlock: 'm4_07' },
  { id: 'cave_kraken',           name: 'Cave Kraken',           tier: 'boss', minCB: 80,  coinsPerKill: 90,  bonusEvery: 5, bonusAmount: 360, img: `${WIKI_IMG}/Cave_kraken.png`,                            slayerReq: true,  wiki: `${WIKI_PAGE}/Cave_kraken`,           missionUnlock: 'm3_16' },
  { id: 'thermonuclear',         name: 'Thermonuclear',         tier: 'boss', minCB: 90,  coinsPerKill: 100, bonusEvery: 5, bonusAmount: 400, img: `${WIKI_IMG}/Thermonuclear_smoke_devil.png`,              slayerReq: true,  wiki: `${WIKI_PAGE}/Thermonuclear_Smoke_Devil`, missionUnlock: 'm4_06' },
  // Misc
  { id: 'phantom_muspah',        name: 'Phantom Muspah',        tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Phantom_Muspah.png`,                         slayerReq: false, wiki: `${WIKI_PAGE}/Phantom_Muspah`,        missionUnlock: 'm5_08' },
  { id: 'zalcano',               name: 'Zalcano',               tier: 'boss', minCB: 90,  coinsPerKill: 120, bonusEvery: 5, bonusAmount: 480, img: `${WIKI_IMG}/Zalcano.png`,                                slayerReq: false, wiki: `${WIKI_PAGE}/Zalcano`,               missionUnlock: 'm5_04' },
  { id: 'tztok_jad',             name: 'TzTok-Jad',             tier: 'boss', minCB: 100, coinsPerKill: 150, bonusEvery: 3, bonusAmount: 600, img: `${WIKI_IMG}/TzTok-Jad.png`,                             slayerReq: false, wiki: `${WIKI_PAGE}/TzTok-Jad`,            missionUnlock: 'm3_04' },
  { id: 'tzkalmzuk',             name: 'TzKal-Zuk',             tier: 'boss', minCB: 105, coinsPerKill: 200, bonusEvery: 1, bonusAmount: 800, img: `${WIKI_IMG}/TzKal-Zuk.png`,                             slayerReq: false, wiki: `${WIKI_PAGE}/TzKal-Zuk`,            missionUnlock: 'm6_06' },
  // DT2
  { id: 'duke_sucellus',         name: 'Duke Sucellus',         tier: 'boss', minCB: 95,  coinsPerKill: 140, bonusEvery: 5, bonusAmount: 550, img: `${WIKI_IMG}/Duke_Sucellus.png`,                          slayerReq: false, wiki: `${WIKI_PAGE}/Duke_Sucellus`,         missionUnlock: 'm6_14' },
  { id: 'vardorvis',             name: 'Vardorvis',             tier: 'boss', minCB: 95,  coinsPerKill: 140, bonusEvery: 5, bonusAmount: 550, img: `${WIKI_IMG}/Vardorvis.png`,                              slayerReq: false, wiki: `${WIKI_PAGE}/Vardorvis`,             missionUnlock: 'm6_07' },
  { id: 'the_leviathan',         name: 'The Leviathan',         tier: 'boss', minCB: 95,  coinsPerKill: 140, bonusEvery: 5, bonusAmount: 550, img: `${WIKI_IMG}/The_Leviathan.png`,                          slayerReq: false, wiki: `${WIKI_PAGE}/The_Leviathan`,         missionUnlock: 'm6_08' },
  { id: 'the_whisperer',         name: 'The Whisperer',         tier: 'boss', minCB: 95,  coinsPerKill: 140, bonusEvery: 5, bonusAmount: 550, img: `${WIKI_IMG}/The_Whisperer.png`,                          slayerReq: false, wiki: `${WIKI_PAGE}/The_Whisperer`,         missionUnlock: 'm6_15' },

  // ── Varlamore ─────────────────────────────────────────────────────────────
  { id: 'gemstone_crab',   name: 'Gemstone Crab',   tier: 'cb1',  minCB: 1,   coinsPerKill: 3,   bonusEvery: 150, bonusAmount: 20,  img: `${WIKI_IMG}/Gemstone_Crab.png`,                          slayerReq: false, wiki: `${WIKI_PAGE}/Gemstone_crab`,          missionUnlock: 'mv_01' },
  { id: 'perilous_moons',  name: 'Perilous Moons',  tier: 'boss', minCB: 80,  coinsPerKill: 100, bonusEvery: 5,   bonusAmount: 400, img: `${WIKI_IMG}/Blood_moon.png`,                             slayerReq: false, wiki: `${WIKI_PAGE}/Perilous_Moons`,         missionUnlock: 'mv_08' },
  { id: 'amoxliatl',       name: 'Amoxliatl',       tier: 'boss', minCB: 90,  coinsPerKill: 130, bonusEvery: 5,   bonusAmount: 520, img: `${WIKI_IMG}/Amoxliatl.png`,                              slayerReq: false, wiki: `${WIKI_PAGE}/Amoxliatl`,              missionUnlock: 'mv_18b' },
  { id: 'mokha',           name: 'Mokha',           tier: 'boss', minCB: 95,  coinsPerKill: 150, bonusEvery: 5,   bonusAmount: 600, img: `${WIKI_IMG}/Mokha.png`,                                  slayerReq: false, wiki: `${WIKI_PAGE}/Mokha`,                  missionUnlock: 'mv_19' },
  { id: 'sol_heredit',     name: 'Sol Heredit',     tier: 'boss', minCB: 100, coinsPerKill: 180, bonusEvery: 1,   bonusAmount: 720, img: `${WIKI_IMG}/Sol_Heredit.png`,                            slayerReq: false, wiki: `${WIKI_PAGE}/Sol_Heredit`,            missionUnlock: 'mv_16' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getActiveTiers(combatLevel) {
  return TIERS.filter(t => combatLevel >= t.minCB)
}

/** Sorteia N monstros de um tier para liberar automaticamente ao atingir CB */
export function drawTierStarters(tierId, combatLevel, alreadyUnlocked, count = 2) {
  const pool = MONSTERS.filter(
    m => m.tier === tierId && combatLevel >= m.minCB && !alreadyUnlocked.has(m.id)
  )
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count).map(m => m.id)
}

/** Monstros compráveis na loja: tier acessível, CB suficiente, não desbloqueado */
export function getBuyableMonsters(combatLevel, unlockedIds) {
  const activeTierIds = new Set(getActiveTiers(combatLevel).map(t => t.id))
  // Boss sempre aparece na loja (sem auto-unlock), filtrado por minCB do monstro
  return MONSTERS.filter(m => {
    if (m.tier === 'boss') return combatLevel >= m.minCB && !unlockedIds.has(m.id)
    return activeTierIds.has(m.tier) && combatLevel >= m.minCB && !unlockedIds.has(m.id)
  })
}

export function getTierCost(tierId) {
  if (tierId === 'boss') return BOSS_TIER.unlockCost
  return TIERS.find(t => t.id === tierId)?.unlockCost ?? 200
}

export const TIER_META = {
  cb1:  TIERS[0],
  cb40: TIERS[1],
  cb70: TIERS[2],
  cb90: TIERS[3],
  boss: BOSS_TIER,
}