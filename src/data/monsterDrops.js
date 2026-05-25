const W = 'https://oldschool.runescape.wiki/images'
const P = 'https://oldschool.runescape.wiki/w'

function d(id, name, img, wiki, category, monsterId, rarity, note, bis) {
  return {
    id, name,
    img: `${W}/${img}`,
    wiki: `${P}/${wiki}`,
    category,
    source: 'drop',
    monsterId,
    rarity,
    ...(note ? { note } : {}),
    bis: bis ?? false,
  }
}

export const DROPS_BY_MONSTER = {

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 1–39
  // ═══════════════════════════════════════════════════════════════════════════
  goblins: [
    d('iron_dagger',   'Iron Dagger',   'Iron_dagger.png',   'Iron_dagger',   'weapon', 'goblins', 'Comum',    null, false),
    d('iron_sq_shield','Iron Sq Shield','Iron_sq_shield.png','Iron_sq_shield','armour', 'goblins', 'Incomum',  null, false),
  ],

  skeletons: [
    d('iron_full_helm', 'Iron Full Helm', 'Iron_full_helm.png', 'Iron_full_helm', 'armour', 'skeletons', 'Comum', null, false),
    d('iron_platelegs', 'Iron Platelegs', 'Iron_platelegs.png', 'Iron_platelegs', 'armour', 'skeletons', 'Comum', null, false),
    d('iron_chainbody', 'Iron Chainbody', 'Iron_chainbody.png', 'Iron_chainbody', 'armour', 'skeletons', 'Comum', null, false),
  ],

  minotaurs: [
    d('iron_kiteshield', 'Iron Kiteshield', 'Iron_kiteshield.png', 'Iron_kiteshield', 'armour', 'minotaurs', 'Comum', null, false),
  ],

  crawling_hands: [
    d('crawling_hand_item', 'Crawling Hand', 'Crawling_hand_(item).png', 'Crawling_Hand', 'component', 'crawling_hands', 'Comum', 'Componente do Slayer Helmet. Única fonte.', false),
  ],

  lizards: [
    d('mystic_gloves_light', 'Mystic Gloves (light)', 'Mystic_gloves_(light).png', 'Mystic_gloves_(light)', 'armour', 'lizards', '1/512', 'Parte do set Mystic light.', false),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 40–69
  // ═══════════════════════════════════════════════════════════════════════════
  hill_giants: [
    d('giant_key', 'Giant Key', 'Giant_key.png', 'Giant_key', 'component', 'hill_giants', '1/100', 'Permite enfrentar o boss Obor.', false),
  ],

  hobgoblins: [
    d('iron_platebody',  'Iron Platebody',  'Iron_platebody.png',  'Iron_platebody',  'armour', 'hobgoblins', 'Incomum', null, false),
    d('steel_platelegs', 'Steel Platelegs', 'Steel_platelegs.png', 'Steel_platelegs', 'armour', 'hobgoblins', 'Incomum', null, false),
  ],

  moss_giants: [
    d('mossy_key',      'Mossy Key',       'Mossy_key.png',      'Mossy_key',      'component', 'moss_giants', '1/150',  'Permite enfrentar a boss Bryophyta.', false),
    d('steel_full_helm','Steel Full Helm',  'Steel_full_helm.png','Steel_full_helm', 'armour',    'moss_giants', 'Incomum', null, false),
  ],

  ice_warriors: [
    d('mithril_sq_shield', 'Mithril Sq Shield', 'Mithril_sq_shield.png', 'Mithril_sq_shield', 'armour', 'ice_warriors', 'Incomum', null, false),
  ],

  bandits: [
    d('mithril_platelegs', 'Mithril Platelegs', 'Mithril_platelegs.png', 'Mithril_platelegs', 'armour', 'bandits', 'Incomum', null, false),
    d('mithril_platebody', 'Mithril Platebody', 'Mithril_platebody.png', 'Mithril_platebody', 'armour', 'bandits', 'Raro',    null, false),
  ],

  lesser_demons: [
    d('rune_med_helm', 'Rune Med Helm', 'Rune_med_helm.png', 'Rune_med_helm', 'armour', 'lesser_demons', '1/128', 'Ótima fonte acessível. Base para completar o rune set.', false),
    d('rune_full_helm', 'Rune Full Helm', 'Rune_full_helm.png', 'Rune_full_helm', 'armour', 'lesser_demons', '1/128', null, false),
  ],

  banshees: [
    d('mystic_gloves_dark', 'Mystic Gloves (dark)', 'Mystic_gloves_(dark).png', 'Mystic_gloves_(dark)', 'armour', 'banshees', '1/512', 'Parte do set Mystic dark.', false),
  ],

  cave_crawlers: [
    d('bronze_boots', 'Bronze Boots', 'Bronze_boots.png', 'Bronze_boots', 'armour', 'cave_crawlers', '1/128', 'Única fonte de bronze boots no jogo.', false),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 70–89
  // ═══════════════════════════════════════════════════════════════════════════
  fire_giants: [
    d('fire_battlestaff', 'Fire Battlestaff', 'Fire_battlestaff.png', 'Fire_battlestaff', 'weapon', 'fire_giants', '1/128', 'Fire runes ilimitadas. Boa utilidade Ironman.', false),
    d('rune_scimitar',    'Rune Scimitar',    'Rune_scimitar.png',    'Rune_scimitar',    'weapon', 'fire_giants', '1/128', 'Uma das melhores fontes de rune scim sem Smithing.', false),
    d('rune_platelegs',   'Rune Platelegs',   'Rune_platelegs.png',   'Rune_platelegs',   'armour', 'fire_giants', '1/128', null, false),
    d('rune_platebody',   'Rune Platebody',   'Rune_platebody.png',   'Rune_platebody',   'armour', 'fire_giants', '1/512', 'Principal fonte para Ironman. Raro mas possível.', false),
  ],

  greater_demons: [
    d('rune_chainbody', 'Rune Chainbody', 'Rune_chainbody.png', 'Rune_chainbody', 'armour', 'greater_demons', '1/128', null, false),
  ],

  iron_dragons: [
    d('draconic_visage', 'Draconic Visage', 'Draconic_visage.png', 'Draconic_visage', 'component', 'iron_dragons', '1/10,000', 'Faz o Dragonfire Shield (BIS anti-dragonfire). Também dropa de Steel/Rune Dragons.', false),
  ],

  steel_dragons: [
    d('dragon_platelegs', 'Dragon Platelegs', 'Dragon_platelegs.png', 'Dragon_platelegs', 'armour', 'steel_dragons', '1/512', 'Dragon legs (60 Defence). Também dropa de outros dragões e Vorkath.', false),
  ],

  hellhounds: [
    d('smouldering_stone', 'Smouldering Stone', 'Smouldering_stone.png', 'Smouldering_stone', 'component', 'hellhounds', '1/32,768', 'Transforma Dragon axe/pickaxe/harpoon na versão Infernal.', false),
  ],

  cave_horrors: [
    d('black_mask',        'Black Mask',         'Black_mask.png',           'Black_mask',           'armour', 'cave_horrors', '1/512', 'Essencial — base do Slayer Helmet (+16.67% melee on task). ÚNICA fonte no jogo.', true),
    d('mystic_dark_top',   'Mystic Top (dark)',   'Mystic_top_(dark).png',    'Mystic_top_(dark)',    'armour', 'cave_horrors', '1/512', 'Parte do set Mystic dark. Boa armadura magic mid-game.', false),
    d('mystic_dark_bottom','Mystic Bottom (dark)','Mystic_bottom_(dark).png', 'Mystic_bottom_(dark)', 'armour', 'cave_horrors', '1/512', 'Parte do set Mystic dark. Boa armadura magic mid-game.', false),
  ],

  basilisks: [
    d('mithril_full_helm', 'Mithril Full Helm', 'Mithril_full_helm.png', 'Mithril_full_helm', 'armour',    'basilisks', 'Incomum',  null, false),
    d('basilisk_jaw',      'Basilisk Jaw',      'Basilisk_jaw.png',      'Basilisk_jaw',      'component', 'basilisks', '1/1,000', 'Upgrade do Neitiznot Faceguard (BIS melee helm). Dropa de Basilisk Knights.', true),
  ],

  jellies: [
    d('mithril_boots', 'Mithril Boots', 'Mithril_boots.png', 'Mithril_boots', 'armour', 'jellies', '1/128', 'Única fonte de mithril boots no jogo.', false),
  ],

  turoth: [
    d('leaf_bladed_sword', 'Leaf-bladed Sword', 'Leaf-bladed_sword.png', 'Leaf-bladed_sword', 'weapon', 'turoth', '1/500', 'Necessário para atacar Turoth e Kurask eficientemente.', false),
  ],

  kurask: [
    d('leaf_bladed_battleaxe', 'Leaf-bladed Battleaxe', 'Leaf-bladed_battleaxe.png', 'Leaf-bladed_battleaxe', 'weapon', 'kurask', '1/1,026', '+17.5% dano vs Turoth/Kurask, +92 str. ÚNICA fonte.', false),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CB 90+
  // ═══════════════════════════════════════════════════════════════════════════
  abyssal_demons: [
    d('abyssal_whip', 'Abyssal Whip', 'Abyssal_whip.png', 'Abyssal_whip', 'weapon', 'abyssal_demons', '1/512', 'BIS melee training weapon. Milestone essencial do Ironman. ÚNICA fonte.', true),
  ],

  nechryaels: [
    d('rune_boots',       'Rune Boots',        'Rune_boots.png',        'Rune_boots',        'armour', 'nechryaels', '1/116', '+2 Strength bonus. Principal fonte no jogo.', false),
    d('adamant_full_helm','Adamant Full Helm',  'Adamant_full_helm.png', 'Adamant_full_helm', 'armour', 'nechryaels', 'Comum', null, false),
    d('adamant_platelegs','Adamant Platelegs',  'Adamant_platelegs.png', 'Adamant_platelegs', 'armour', 'nechryaels', 'Comum', null, false),
  ],

  dust_devils: [
    d('dragon_dagger',    'Dragon Dagger',    'Dragon_dagger.png',    'Dragon_dagger',    'weapon', 'dust_devils', '1/128',   'BIS spec weapon — double hit spec. Essencial para pvm.', true),
    d('dust_battlestaff', 'Dust Battlestaff', 'Dust_battlestaff.png', 'Dust_battlestaff', 'weapon', 'dust_devils', '1/4,000', 'Air + Earth runes ilimitados. ÚNICA fonte.', false),
  ],

  gargoyles: [
    d('granite_maul', 'Granite Maul', 'Granite_maul.png', 'Granite_maul', 'weapon', 'gargoyles', '1/256', 'Principal fonte. Crush weapon com spec rápido. Popular no NMZ e PvP.', false),
  ],

  dark_beasts: [
    d('dark_bow', 'Dark Bow', 'Dark_bow.png', 'Dark_bow', 'weapon', 'dark_beasts', '1/512', 'ÚNICA fonte. Spec com Dragon Arrows = maior hit único de Ranged.', false),
  ],

  smoke_devils: [
    d('occult_necklace', 'Occult Necklace', 'Occult_necklace.png', 'Occult_necklace', 'accessory', 'smoke_devils', '1/512', 'ÚNICO amuleto que aumenta Magic damage (+5%). BIS mage neck. ÚNICA fonte.', true),
  ],

  wyrms: [
    d('dragon_sword',   'Dragon Sword',   'Dragon_sword.png',   'Dragon_sword',   'weapon', 'wyrms', '1/2,000 (on task)', 'ÚNICA fonte de Dragon Sword no jogo.', false),
    d('dragon_harpoon', 'Dragon Harpoon', 'Dragon_harpoon.png', 'Dragon_harpoon', 'tool',   'wyrms', '1/2,000 (on task)', 'BIS fishing harpoon. Spec boost +3 Fishing. ÚNICA fonte.', true),
  ],

  drakes: [
    d('dragon_mace', 'Dragon Mace', 'Dragon_mace.png', 'Dragon_mace', 'weapon', 'drakes', '1/93', 'Dragon weapon com boa crush spec.', false),
  ],

  demonic_gorillas: [
    d('zenyte_shard',  'Zenyte Shard',  'Zenyte_shard.png',  'Zenyte_shard',  'component', 'demonic_gorillas', '1/300',   'Componente de TODA a BIS jewellery (Torture, Anguish, Suffering, Tormented). ÚNICA fonte.', true),
    d('ballista_limbs','Ballista Limbs','Ballista_limbs.png','Ballista_limbs','component', 'demonic_gorillas', '1/500',   'Componente do Heavy Ballista (BIS ranged pre-Twisted Bow).', false),
    d('heavy_frame',   'Heavy Frame',   'Heavy_frame.png',   'Heavy_frame',   'component', 'demonic_gorillas', '1/1,500', 'Componente mais raro do Heavy Ballista.', false),
  ],

  brutal_black_dragons: [
    d('dragon_spear',    'Dragon Spear',    'Dragon_spear.png',    'Dragon_spear',    'weapon', 'brutal_black_dragons', '1/512', 'ÚNICA fonte direta no jogo.', false),
    d('dragon_med_helm', 'Dragon Med Helm', 'Dragon_med_helm.png', 'Dragon_med_helm', 'armour', 'brutal_black_dragons', '1/128', 'Também dropa de KBD, Sarachnis e Rune Dragons.', false),
  ],

  rune_dragons: [
    d('dragon_metal_lump', 'Dragon Metal Lump', 'Dragon_metal_lump.png', 'Dragon_metal_lump', 'component', 'rune_dragons', '1/5,000', 'Exclusivo de Rune Dragons. Upgreda peças de dragon armour.', false),
  ],

  spiritual_mages: [
    d('dragon_boots', 'Dragon Boots', 'Dragon_boots.png', 'Dragon_boots', 'armour', 'spiritual_mages', '1/128', 'BIS melee boots mid-game (+4 str). Principal fonte.', true),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // Bosses
  // ═══════════════════════════════════════════════════════════════════════════
  obor: [
    d('hill_giant_club', 'Hill Giant Club', 'Hill_giant_club.png', 'Hill_giant_club', 'weapon', 'obor', 'Via chest (Giant Key)', 'Melhor crush weapon para iniciantes. Exclusivo do Obor.', false),
  ],

  bryophyta: [
    d('bryophyta_staff', "Bryophyta's Staff", 'Bryophyta%27s_staff.png', 'Bryophyta%27s_staff', 'weapon', 'bryophyta', 'Via essence (chest)', 'Armazena 30 nature runes. Forte magic weapon inicial.', false),
  ],

  skotizo: [
    d('shield_left_half', 'Shield Left Half', 'Shield_left_half.png', 'Shield_left_half', 'component', 'skotizo', '1/100', 'ÚNICA fonte direta. Combina para fazer Dragon Sq Shield.', false),
  ],

  sarachnis: [
    d('sarachnis_cudgel', 'Sarachnis Cudgel', 'Sarachnis_cudgel.png', 'Sarachnis_cudgel', 'weapon', 'sarachnis', '1/384', 'BIS crush weapon mid-game não-degradável. Exclusivo.', true),
  ],

  kbd: [
    d('dragon_pickaxe', 'Dragon Pickaxe', 'Dragon_pickaxe.png', 'Dragon_pickaxe', 'tool', 'kbd', '1/1,000', 'BIS pickaxe. Spec boost +3 Mining. Também dropa de KQ e DKs.', true),
  ],

  barrows: [
    d('dharoks_set', "Dharok's Set",  "Dharok%27s_helm.png",  "Dharok%27s_equipment",  'armour', 'barrows', 'Via reward chest', 'Set effect: dano aumenta conforme HP cai. Essencial para NMZ.', false),
    d('ahrims_set',  "Ahrim's Set",   "Ahrim%27s_hood.png",   "Ahrim%27s_equipment",   'armour', 'barrows', 'Via reward chest', 'BIS magic armour mid-game. Set effect drena Strength do inimigo.', true),
    d('guthans_set', "Guthan's Set",  "Guthan%27s_helm.png",  "Guthan%27s_equipment",  'armour', 'barrows', 'Via reward chest', '25% chance de curar HP igual ao dano causado. AFK Slayer.', false),
    d('veracs_set',  "Verac's Set",   "Verac%27s_helm.png",   "Verac%27s_equipment",   'armour', 'barrows', 'Via reward chest', '25% de ignorar armadura e prayers. Essencial para bossing.', false),
    d('karils_set',  "Karil's Set",   "Karil%27s_coif.png",   "Karil%27s_equipment",   'armour', 'barrows', 'Via reward chest', 'Maior magic defence dos sets Barrows.', false),
    d('torags_set',  "Torag's Set",   "Torag%27s_helm.png",   "Torag%27s_equipment",   'armour', 'barrows', 'Via reward chest', 'Maior defence geral dos sets Barrows.', false),
  ],

  dagannoth_rex: [
    d('berserker_ring', 'Berserker Ring', 'Berserker_ring.png', 'Berserker_ring', 'accessory', 'dagannoth_rex', '1/128', 'BIS melee ring imbued (+8 str). ÚNICA fonte.', true),
    d('warrior_ring',   'Warrior Ring',   'Warrior_ring.png',   'Warrior_ring',   'accessory', 'dagannoth_rex', '1/128', 'Melhor slash ring imbued. ÚNICA fonte.', false),
    d('dragon_axe',     'Dragon Axe',     'Dragon_axe.png',     'Dragon_axe',     'tool',      'dagannoth_rex', '1/128', 'BIS woodcutting axe. Spec boost +3 WC. Dropa dos 3 DKs.', true),
  ],

  dagannoth_prime: [
    d('seers_ring',     "Seers' Ring",    'Seers_ring.png',     'Seers_ring',     'accessory', 'dagannoth_prime', '1/128', 'BIS magic ring imbued. ÚNICA fonte.', true),
    d('mud_battlestaff','Mud Battlestaff','Mud_battlestaff.png','Mud_battlestaff', 'weapon',    'dagannoth_prime', '1/128', 'Water + Earth runes ilimitados simultaneamente. ÚNICA fonte.', false),
  ],

  dagannoth_supreme: [
    d('archers_ring', "Archers' Ring", 'Archers_ring.png', 'Archers_ring', 'accessory', 'dagannoth_supreme', '1/128', 'BIS ranged ring imbued. ÚNICA fonte.', true),
  ],

  kalphite_queen: [
    d('dragon_chainbody', 'Dragon Chainbody', 'Dragon_chainbody.png', 'Dragon_chainbody', 'armour', 'kalphite_queen', '1/128', 'Assinatura da KQ (1/128). Também dropa de Dust/Smoke Devils.', false),
    d('dragon_2h_sword',  'Dragon 2h Sword',  'Dragon_2h_sword.png',  'Dragon_2h_sword',  'weapon', 'kalphite_queen', '1/256', 'KQ é a principal fonte.', false),
  ],

  zulrah: [
    d('tanzanite_fang',   'Tanzanite Fang',   'Tanzanite_fang.png',   'Tanzanite_fang',   'component', 'zulrah', '~1/512', 'Faz o Toxic Blowpipe (BIS ranged weapon mid-game). ÚNICA fonte.', true),
    d('magic_fang',       'Magic Fang',       'Magic_fang.png',       'Magic_fang',       'component', 'zulrah', '~1/512', 'Upgrade do Trident of the Seas → Trident of the Swamp (BIS magic). ÚNICA fonte.', true),
    d('serpentine_visage','Serpentine Visage','Serpentine_visage.png','Serpentine_visage','component', 'zulrah', '~1/512', 'Faz o Serpentine Helm (venena automaticamente). ÚNICA fonte.', false),
  ],

  vorkath: [
    d('vorkath_head',       "Vorkath's Head",     'Vorkath%27s_head.png',  "Vorkath%27s_head",  'component', 'vorkath', '1/50 (garantido em 50 kills)', "Faz Ava's Assembler (BIS ammo-saving cape). ÚNICA fonte.", true),
    d('skeletal_visage',    'Skeletal Visage',     'Skeletal_visage.png',   'Skeletal_visage',   'component', 'vorkath', '1/5,000', 'Faz o Dragonfire Ward (maior ranged attack bonus em escudo). ÚNICA fonte.', true),
    d('dragonbone_necklace','Dragonbone Necklace', 'Dragonbone_necklace.png','Dragonbone_necklace','accessory', 'vorkath', '1/1,000', 'Maior Prayer bonus necklace (+12). Restaura prayer ao enterrar. ÚNICA fonte.', false),
  ],

  alchemical_hydra: [
    d('hydra_claw',       "Hydra's Claw",    'Hydra%27s_claw.png',    "Hydra%27s_claw",    'component', 'alchemical_hydra', '1/1,000',          'Faz o Dragon Hunter Lance (BIS melee vs dragônicos, +20% acc/dmg). ÚNICA fonte.', true),
    d('ferocious_gloves', 'Ferocious Gloves','Ferocious_gloves.png',  'Ferocious_gloves',  'armour',    'alchemical_hydra', '1/512 (hydra leather)', 'BIS melee gloves ofensivas (+14 str). Supera Barrows Gloves. ÚNICA fonte.', true),
    d('brimstone_ring',   'Brimstone Ring',  'Brimstone_ring.png',    'Brimstone_ring',    'accessory', 'alchemical_hydra', '~1/181 (cada componente)', 'Ring híbrido forte. Todos os componentes exclusivos da Alchemical Hydra.', false),
    d('hydra_tail',       'Hydra Tail',      'Hydra_tail.png',        'Hydra_tail',        'component', 'alchemical_hydra', '1/512',             'Faz o Bonecrusher Necklace. ÚNICA fonte.', false),
  ],

  aberrant_spectres: [
    d('herb_sack_drop', 'Herb Sack', 'Herb_sack.png', 'Herb_sack', 'component', 'aberrant_spectres', 'Incomum (via Slayer points)', 'Armazena grimy herbs. QoL essencial para Herblore Ironman.', false),
  ],

  skeletal_wyverns: [
    d('wyvern_visage',   'Wyvern Visage',   'Wyvern_visage.png',   'Wyvern_visage',   'component', 'skeletal_wyverns', '1/5,000', 'Faz o Ancient Wyvern Shield (BIS anti-magic shield). ÚNICA fonte.', false),
    d('granite_shield',  'Granite Shield',  'Granite_shield.png',  'Granite_shield',  'armour',    'skeletal_wyverns', '1/512',   'Maior defence bonus de escudos acessíveis. Pré-Dragonfire Ward.', false),
  ],

  basilisk_knights: [
    d('basilisk_jaw', 'Basilisk Jaw', 'Basilisk_jaw.png', 'Basilisk_jaw', 'component', 'basilisk_knights', '1/1,000', 'Combina com Helm of Neitiznot → Neitiznot Faceguard (BIS head melee). ÚNICA fonte.', true),
  ],

  grotesque_guardians: [
    d('granite_hammer',          'Granite Hammer',          'Granite_hammer.png',          'Granite_hammer',          'weapon',    'grotesque_guardians', '1/750',   'BIS crush weapon alternativo. Especial: +5 Strength temporário. ÚNICA fonte.', false),
    d('black_tourmaline_core',   'Black Tourmaline Core',   'Black_tourmaline_core.png',   'Black_tourmaline_core',   'component', 'grotesque_guardians', '1/500',   'Combina com Dragon Boots → Guardian Boots (+4 str vs Dragon Boots). ÚNICA fonte.', true),
    d('granite_gloves',          'Granite Gloves',          'Granite_gloves.png',          'Granite_gloves',          'armour',    'grotesque_guardians', '1/250',   'Mid-game melee gloves. ÚNICA fonte.', false),
    d('granite_ring',            'Granite Ring',            'Granite_ring.png',            'Granite_ring',            'accessory', 'grotesque_guardians', '1/250',   'Mid-game ring (+6 all defences). ÚNICA fonte.', false),
  ],

  abyssal_sire: [
    d('abyssal_dagger',  'Abyssal Dagger',  'Abyssal_dagger.png',  'Abyssal_dagger',  'weapon',    'abyssal_sire', '1/492 (via Unsired)', 'BIS stab weapon mid-game. Especial: drena defence. ÚNICA fonte.', true),
    d('abyssal_bludgeon','Abyssal Bludgeon','Abyssal_bludgeon.png','Abyssal_bludgeon','weapon',    'abyssal_sire', '1/492 (via Unsired)', 'BIS crush para monstros com alta mage defence. ÚNICA fonte.', false),
  ],

  cave_kraken: [
    d('kraken_tentacle',     'Kraken Tentacle',     'Kraken_tentacle.png',     'Kraken_tentacle',     'component', 'cave_kraken', '1/512',  'Upgrada Abyssal Whip → Abyssal Tentacle (+4 slash). ÚNICA fonte.', false),
    d('trident_of_the_seas', 'Trident of the Seas', 'Trident_of_the_seas.png', 'Trident_of_the_seas', 'weapon',    'cave_kraken', '1/512',  'BIS magic weapon mid-game. PRINCIPAL fonte.', false),
  ],

  cerberus: [
    d('primordial_crystal', 'Primordial Crystal', 'Primordial_crystal.png', 'Primordial_crystal', 'component', 'cerberus', '1/512', 'Upgrade → Primordial Boots (BIS melee boots, +5 str). ÚNICA fonte.', true),
    d('pegasian_crystal',   'Pegasian Crystal',   'Pegasian_crystal.png',   'Pegasian_crystal',   'component', 'cerberus', '1/512', 'Upgrade → Pegasian Boots (BIS ranged boots). ÚNICA fonte.', true),
    d('eternal_crystal',    'Eternal Crystal',    'Eternal_crystal.png',    'Eternal_crystal',    'component', 'cerberus', '1/512', 'Upgrade → Eternal Boots (BIS magic boots). ÚNICA fonte.', true),
  ],

  k_ril_tsutsaroth: [
    d('zamorak_hilt', 'Zamorak Hilt', 'Zamorak_hilt.png', 'Zamorak_hilt', 'component', 'k_ril_tsutsaroth', '1/508', 'Faz o Zamorakian Spear / Zamorak Godsword.', false),
  ],

  general_graardor: [
    d('bandos_hilt', 'Bandos Hilt', 'Bandos_hilt.png', 'Bandos_hilt', 'component', 'general_graardor', '1/508', 'Faz o Bandos Godsword (BIS spec weapon). ÚNICA fonte.', false),
  ],

  commander_zilyana: [
    d('saradomin_hilt', 'Saradomin Hilt', 'Saradomin_hilt.png', 'Saradomin_hilt', 'component', 'commander_zilyana', '1/508', 'Faz o Saradomin Godsword. ÚNICA fonte.', false),
  ],

  kreearra: [
    d('armadyl_hilt', 'Armadyl Hilt', 'Armadyl_hilt.png', 'Armadyl_hilt', 'component', 'kreearra', '1/508', 'Faz o Armadyl Godsword. ÚNICA fonte.', false),
  ],

  tztok_jad: [
    d('fire_cape', 'Fire Cape', 'Fire_cape.png', 'Fire_cape', 'armour', 'tztok_jad', 'Garantido', 'BIS melee cape antes do Infernal. Requer completar TzHaar Fight Cave.', false),
  ],

  tzkalmzuk: [
    d('infernal_cape', 'Infernal Cape', 'Infernal_cape.png', 'Infernal_cape', 'armour', 'tzkalmzuk', 'Garantido', 'BIS melee cape do jogo. Requer completar Inferno.', true),
  ],

  phantom_muspah: [
    d('venator_shard', 'Venator Shard', 'Venator_shard.png', 'Venator_shard', 'component', 'phantom_muspah', '1/200 (avg)', 'Componente do Venator Bow (BIS ranged bow). ÚNICA fonte.', false),
  ],

  // ── Varlamore ─────────────────────────────────────────────────────────────
  amoxliatl: [
    d('pendant_of_ates',  'Pendant of Ates (inert)',  'Pendant_of_ates_%28inert%29.png',  'Pendant_of_ates_(inert)',  'armour',    'amoxliatl', '1/25',  'Drop único de Amoxliatl. Ao ser ativado torna-se o Pendant of Ates completo — amulet de pescoço de Varlamore.', true),
    d('glacial_temotli',  'Glacial Temotli',          'Glacial_temotli.png',              'Glacial_temotli',          'component', 'amoxliatl', '1/100', 'Drop único de Amoxliatl. Possivelmente componente para craftar equipamentos endgame de Varlamore.', true),
  ],
}
