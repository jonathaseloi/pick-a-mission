// ─────────────────────────────────────────────────────────────────────────────
// BIS — Best in Slot por estilo de combate
//
// Cada entrada define um item que ocupa um slot de equipamento.
// priority: quanto maior, melhor o item (usado para encontrar o BIS)
// _unlockRef: aponta para um unlock ID diferente da chave do objeto
// _equipmentId: aponta para um item comprado no sistema PAM (obtainedEquipment)
// equipReqs: unlock IDs de skill que o jogador precisa ter para equipar
//
// Slots: head | cape | neck | ammo | weapon | body | shield | legs | hands | feet | ring
// Styles: melee | ranged | mage
// ─────────────────────────────────────────────────────────────────────────────

export const BIS = {

  // ══════════════════════════════════════════════════════════════════════════
  // MELEE
  // ══════════════════════════════════════════════════════════════════════════

  // ── Head ──────────────────────────────────────────────────────────────────
  iron_armor: {
    slot: 'head', style: 'melee', priority: 2,
    name: 'Iron Full Helm',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Iron_full_helm.png',
  },
  steel_armor: {
    slot: 'head', style: 'melee', priority: 3,
    name: 'Steel Full Helm',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Steel_full_helm.png',
  },
  mithril_armor: {
    slot: 'head', style: 'melee', priority: 4,
    name: 'Mithril Full Helm',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Mithril_full_helm.png',
  },
  rune_armor: {
    slot: 'head', style: 'melee', priority: 6,
    name: 'Rune Full Helm',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Rune_full_helm.png',
  },
  bandos_armor: {
    slot: 'head', style: 'melee', priority: 9,
    name: 'Neitiznot Faceguard',
    equipReqs: ['defence_70'],
    image: 'https://oldschool.runescape.wiki/images/Neitiznot_faceguard.png',
  },
  // equipment-shop items for head
  iron_full_helm_eq:    { _equipmentId: 'iron_full_helm',    slot: 'head', style: 'melee', priority: 2,  equipReqs: [], name: 'Iron Full Helm',    image: 'https://oldschool.runescape.wiki/images/Iron_full_helm.png' },
  steel_full_helm_eq:   { _equipmentId: 'steel_full_helm',   slot: 'head', style: 'melee', priority: 3,  equipReqs: [], name: 'Steel Full Helm',   image: 'https://oldschool.runescape.wiki/images/Steel_full_helm.png' },
  mithril_full_helm_eq: { _equipmentId: 'mithril_full_helm', slot: 'head', style: 'melee', priority: 4,  equipReqs: [], name: 'Mithril Full Helm', image: 'https://oldschool.runescape.wiki/images/Mithril_full_helm.png' },
  rune_med_helm_eq:     { _equipmentId: 'rune_med_helm',     slot: 'head', style: 'melee', priority: 5,  equipReqs: ['defence_40'], name: 'Rune Med Helm',     image: 'https://oldschool.runescape.wiki/images/Rune_med_helm.png' },
  rune_full_helm_eq:    { _equipmentId: 'rune_full_helm',    slot: 'head', style: 'melee', priority: 6,  equipReqs: ['defence_40'], name: 'Rune Full Helm',    image: 'https://oldschool.runescape.wiki/images/Rune_full_helm.png' },
  dragon_med_helm_eq:   { _equipmentId: 'dragon_med_helm',   slot: 'head', style: 'melee', priority: 7,  equipReqs: ['defence_60'], name: 'Dragon Med Helm',   image: 'https://oldschool.runescape.wiki/images/Dragon_med_helm.png' },

  // ── Body ──────────────────────────────────────────────────────────────────
  leather_armor: {
    slot: 'body', style: 'melee', priority: 1,
    name: 'Leather Body',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Leather_body.png',
  },
  fighter_torso: {
    slot: 'body', style: 'melee', priority: 7,
    name: 'Fighter Torso',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Fighter_torso.png',
  },
  bandos_armor_body: {
    _unlockRef: 'bandos_armor',
    slot: 'body', style: 'melee', priority: 10,
    name: 'Bandos Chestplate',
    equipReqs: ['defence_65'],
    image: 'https://oldschool.runescape.wiki/images/Bandos_chestplate.png',
  },
  // equipment-shop items for body
  iron_platebody_eq:    { _equipmentId: 'iron_platebody',    slot: 'body', style: 'melee', priority: 2, equipReqs: [], name: 'Iron Platebody',    image: 'https://oldschool.runescape.wiki/images/Iron_platebody.png' },
  iron_chainbody_eq:    { _equipmentId: 'iron_chainbody',    slot: 'body', style: 'melee', priority: 2, equipReqs: [], name: 'Iron Chainbody',    image: 'https://oldschool.runescape.wiki/images/Iron_chainbody.png' },
  mithril_platebody_eq: { _equipmentId: 'mithril_platebody', slot: 'body', style: 'melee', priority: 4, equipReqs: [], name: 'Mithril Platebody', image: 'https://oldschool.runescape.wiki/images/Mithril_platebody.png' },
  rune_chainbody_eq:    { _equipmentId: 'rune_chainbody',    slot: 'body', style: 'melee', priority: 4, equipReqs: ['defence_40'], name: 'Rune Chainbody',    image: 'https://oldschool.runescape.wiki/images/Rune_chainbody.png' },
  rune_platebody_eq:    { _equipmentId: 'rune_platebody',    slot: 'body', style: 'melee', priority: 5, equipReqs: ['defence_40'], name: 'Rune Platebody',    image: 'https://oldschool.runescape.wiki/images/Rune_platebody.png' },
  dragon_chainbody_eq:  { _equipmentId: 'dragon_chainbody',  slot: 'body', style: 'melee', priority: 7, equipReqs: ['defence_60'], name: 'Dragon Chainbody',  image: 'https://oldschool.runescape.wiki/images/Dragon_chainbody.png' },

  // ── Legs ──────────────────────────────────────────────────────────────────
  barrows_legs: {
    _unlockRef: 'barrows_armor',
    slot: 'legs', style: 'melee', priority: 7,
    name: "Torag's Platelegs",
    equipReqs: ['defence_70'],
    image: 'https://oldschool.runescape.wiki/images/Torag%27s_platelegs.png',
  },
  bandos_tassets: {
    _unlockRef: 'bandos_armor',
    slot: 'legs', style: 'melee', priority: 10,
    name: 'Bandos Tassets',
    equipReqs: ['defence_65'],
    image: 'https://oldschool.runescape.wiki/images/Bandos_tassets.png',
  },
  // equipment-shop items for legs
  iron_platelegs_eq:    { _equipmentId: 'iron_platelegs',    slot: 'legs', style: 'melee', priority: 2, equipReqs: [], name: 'Iron Platelegs',    image: 'https://oldschool.runescape.wiki/images/Iron_platelegs.png' },
  steel_platelegs_eq:   { _equipmentId: 'steel_platelegs',   slot: 'legs', style: 'melee', priority: 3, equipReqs: [], name: 'Steel Platelegs',   image: 'https://oldschool.runescape.wiki/images/Steel_platelegs.png' },
  mithril_platelegs_eq: { _equipmentId: 'mithril_platelegs', slot: 'legs', style: 'melee', priority: 4, equipReqs: [], name: 'Mithril Platelegs', image: 'https://oldschool.runescape.wiki/images/Mithril_platelegs.png' },
  rune_platelegs_eq:    { _equipmentId: 'rune_platelegs',    slot: 'legs', style: 'melee', priority: 5, equipReqs: ['defence_40'], name: 'Rune Platelegs',    image: 'https://oldschool.runescape.wiki/images/Rune_platelegs.png' },
  dragon_platelegs_eq:  { _equipmentId: 'dragon_platelegs',  slot: 'legs', style: 'melee', priority: 7, equipReqs: ['defence_60'], name: 'Dragon Platelegs',  image: 'https://oldschool.runescape.wiki/images/Dragon_platelegs.png' },

  // ── Weapon ────────────────────────────────────────────────────────────────
  bronze_sword: {
    slot: 'weapon', style: 'melee', priority: 1,
    name: 'Bronze Sword',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Bronze_sword.png',
  },
  iron_sword: {
    slot: 'weapon', style: 'melee', priority: 2,
    name: 'Iron Sword',
    equipReqs: ['attack_30'],
    image: 'https://oldschool.runescape.wiki/images/Iron_sword.png',
  },
  steel_scimitar: {
    slot: 'weapon', style: 'melee', priority: 3,
    name: 'Steel Scimitar',
    equipReqs: ['attack_30'],
    image: 'https://oldschool.runescape.wiki/images/Steel_scimitar.png',
  },
  mithril_scim: {
    slot: 'weapon', style: 'melee', priority: 4,
    name: 'Mithril Scimitar',
    equipReqs: ['attack_40'],
    image: 'https://oldschool.runescape.wiki/images/Mithril_scimitar.png',
  },
  rune_scimitar: {
    slot: 'weapon', style: 'melee', priority: 5,
    name: 'Rune Scimitar',
    equipReqs: ['attack_40'],
    image: 'https://oldschool.runescape.wiki/images/Rune_scimitar.png',
  },
  giant_club: {
    _equipmentId: 'hill_giant_club',
    slot: 'weapon', style: 'melee', priority: 4,
    name: 'Hill Giant Club',
    equipReqs: ['strength_40'],
    image: 'https://oldschool.runescape.wiki/images/Hill_giant_club.png',
  },
  d_scimitar: {
    _equipmentId: 'dragon_scimitar',
    slot: 'weapon', style: 'melee', priority: 6,
    name: 'Dragon Scimitar',
    equipReqs: ['attack_60'],
    image: 'https://oldschool.runescape.wiki/images/Dragon_scimitar.png',
  },
  abyssal_whip: {
    slot: 'weapon', style: 'melee', priority: 8,
    name: 'Abyssal Whip',
    equipReqs: ['attack_70'],
    image: 'https://oldschool.runescape.wiki/images/Abyssal_whip.png',
  },
  d_warhammer: {
    slot: 'weapon', style: 'melee', priority: 7,
    name: 'Dragon Warhammer',
    equipReqs: ['attack_60'],
    image: 'https://oldschool.runescape.wiki/images/Dragon_warhammer.png',
  },
  bandos_gs: {
    slot: 'weapon', style: 'melee', priority: 9,
    name: 'Bandos Godsword',
    equipReqs: ['attack_75'],
    image: 'https://oldschool.runescape.wiki/images/Bandos_godsword.png',
  },
  // equipment-shop weapons
  iron_dagger_eq:           { _equipmentId: 'iron_dagger',           slot: 'weapon', style: 'melee', priority: 1, equipReqs: [], name: 'Iron Dagger',           image: 'https://oldschool.runescape.wiki/images/Iron_dagger.png' },
  rune_scimitar_eq:         { _equipmentId: 'rune_scimitar',         slot: 'weapon', style: 'melee', priority: 5, equipReqs: [], name: 'Rune Scimitar',         image: 'https://oldschool.runescape.wiki/images/Rune_scimitar.png' },
  leaf_bladed_sword_eq:     { _equipmentId: 'leaf_bladed_sword',     slot: 'weapon', style: 'melee', priority: 5, equipReqs: [], name: 'Leaf-bladed Sword',     image: 'https://oldschool.runescape.wiki/images/Leaf-bladed_sword.png' },
  leaf_bladed_battleaxe_eq: { _equipmentId: 'leaf_bladed_battleaxe', slot: 'weapon', style: 'melee', priority: 6, equipReqs: [], name: 'Leaf-bladed Battleaxe', image: 'https://oldschool.runescape.wiki/images/Leaf-bladed_battleaxe.png' },
  dragon_dagger_eq:         { _equipmentId: 'dragon_dagger',         slot: 'weapon', style: 'melee', priority: 6, equipReqs: ['attack_60'], name: 'Dragon Dagger',         image: 'https://oldschool.runescape.wiki/images/Dragon_dagger.png' },
  sarachnis_cudgel_eq:      { _equipmentId: 'sarachnis_cudgel',      slot: 'weapon', style: 'melee', priority: 7, equipReqs: [],             name: 'Sarachnis Cudgel',      image: 'https://oldschool.runescape.wiki/images/Sarachnis_cudgel.png' },
  dragon_mace_eq:           { _equipmentId: 'dragon_mace',           slot: 'weapon', style: 'melee', priority: 6, equipReqs: ['attack_60'], name: 'Dragon Mace',           image: 'https://oldschool.runescape.wiki/images/Dragon_mace.png' },
  dragon_2h_sword_eq:       { _equipmentId: 'dragon_2h_sword',       slot: 'weapon', style: 'melee', priority: 7, equipReqs: ['attack_60'], name: 'Dragon 2h Sword',       image: 'https://oldschool.runescape.wiki/images/Dragon_2h_sword.png' },
  abyssal_whip_eq:          { _equipmentId: 'abyssal_whip',          slot: 'weapon', style: 'melee', priority: 8, equipReqs: ['attack_70'], name: 'Abyssal Whip',          image: 'https://oldschool.runescape.wiki/images/Abyssal_whip.png' },

  // ── Shield ────────────────────────────────────────────────────────────────
  mithril_shield: {
    _equipmentId: 'mithril_sq_shield',
    _unlockRef: 'mithril_armor',
    slot: 'shield', style: 'melee', priority: 3,
    name: 'Mithril Kiteshield',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Mithril_kiteshield.png',
  },
  rune_shield: {
    _unlockRef: 'rune_armor',
    slot: 'shield', style: 'melee', priority: 5,
    name: 'Rune Kiteshield',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Rune_kiteshield.png',
  },
  // equipment-shop shields
  iron_sq_shield_eq:    { _equipmentId: 'iron_sq_shield',    slot: 'shield', style: 'melee', priority: 1, equipReqs: [], name: 'Iron Sq Shield',    image: 'https://oldschool.runescape.wiki/images/Iron_sq_shield.png' },
  iron_kiteshield_eq:   { _equipmentId: 'iron_kiteshield',   slot: 'shield', style: 'melee', priority: 2, equipReqs: [], name: 'Iron Kiteshield',   image: 'https://oldschool.runescape.wiki/images/Iron_kiteshield.png' },
  mithril_sq_shield_eq: { _equipmentId: 'mithril_sq_shield', slot: 'shield', style: 'melee', priority: 3, equipReqs: [], name: 'Mithril Sq Shield', image: 'https://oldschool.runescape.wiki/images/Mithril_sq_shield.png' },

  // ── Boots ─────────────────────────────────────────────────────────────────
  mithril_boots: {
    slot: 'feet', style: 'melee', priority: 3,
    name: 'Mithril Boots',
    equipReqs: ['defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Mithril_boots.png',
  },
  dragon_boots: {
    slot: 'feet', style: 'melee', priority: 8,
    name: 'Dragon Boots',
    equipReqs: ['defence_60'],
    image: 'https://oldschool.runescape.wiki/images/Dragon_boots.png',
  },
  // equipment-shop boots
  mithril_boots_eq:  { _equipmentId: 'mithril_boots',  slot: 'feet', style: 'melee', priority: 3, equipReqs: [],             name: 'Mithril Boots',  image: 'https://oldschool.runescape.wiki/images/Mithril_boots.png' },
  rune_boots_eq:     { _equipmentId: 'rune_boots',     slot: 'feet', style: 'melee', priority: 5, equipReqs: ['defence_40'], name: 'Rune Boots',     image: 'https://oldschool.runescape.wiki/images/Rune_boots.png' },
  dragon_boots_eq:   { _equipmentId: 'dragon_boots',   slot: 'feet', style: 'melee', priority: 8, equipReqs: ['defence_60'], name: 'Dragon Boots',   image: 'https://oldschool.runescape.wiki/images/Dragon_boots.png' },

  // ── Hands ─────────────────────────────────────────────────────────────────
  barrows_gloves_melee_eq:    { _equipmentId: 'barrows_gloves',    slot: 'hands', style: 'melee', priority: 9,  equipReqs: [], name: 'Barrows Gloves',    image: 'https://oldschool.runescape.wiki/images/Barrows_gloves.png' },
  ferocious_gloves_melee_eq:  { _equipmentId: 'ferocious_gloves',  slot: 'hands', style: 'melee', priority: 10, equipReqs: [], name: 'Ferocious Gloves',  image: 'https://oldschool.runescape.wiki/images/Ferocious_gloves.png' },

  // ── Ring ──────────────────────────────────────────────────────────────────
  berserker_ring: {
    slot: 'ring', style: 'melee', priority: 8,
    name: 'Berserker Ring (i)',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Berserker_ring_%28i%29.png',
  },
  berserker_ring_eq:  { _equipmentId: 'berserker_ring', slot: 'ring', style: 'melee', priority: 8, equipReqs: [], name: 'Berserker Ring',  image: 'https://oldschool.runescape.wiki/images/Berserker_ring.png' },
  warrior_ring_eq:    { _equipmentId: 'warrior_ring',   slot: 'ring', style: 'melee', priority: 5, equipReqs: [], name: 'Warrior Ring',    image: 'https://oldschool.runescape.wiki/images/Warrior_ring.png' },

  // ── Neck ──────────────────────────────────────────────────────────────────
  dragonbone_necklace_eq: { _equipmentId: 'dragonbone_necklace', slot: 'neck', style: 'melee', priority: 5, equipReqs: [], name: 'Dragonbone Necklace', image: 'https://oldschool.runescape.wiki/images/Dragonbone_necklace.png' },

  // ══════════════════════════════════════════════════════════════════════════
  // RANGED
  // ══════════════════════════════════════════════════════════════════════════

  shortbow_ranged: {
    _unlockRef: 'shortbow',
    slot: 'weapon', style: 'ranged', priority: 1, ammoType: 'arrow',
    name: 'Shortbow',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Shortbow.png',
  },
  oak_shortbow_ranged: {
    _unlockRef: 'oak_shortbow',
    slot: 'weapon', style: 'ranged', priority: 2, ammoType: 'arrow',
    name: 'Oak Shortbow',
    equipReqs: ['ranged_40'],
    image: 'https://oldschool.runescape.wiki/images/Oak_shortbow.png',
  },
  maple_shortbow_ranged: {
    _unlockRef: 'maple_shortbow',
    slot: 'weapon', style: 'ranged', priority: 4, ammoType: 'arrow',
    name: 'Maple Shortbow',
    equipReqs: ['ranged_40'],
    image: 'https://oldschool.runescape.wiki/images/Maple_shortbow.png',
  },
  magic_shortbow_ranged: {
    _unlockRef: 'magic_shortbow',
    slot: 'weapon', style: 'ranged', priority: 6, ammoType: 'arrow',
    name: 'Magic Shortbow (i)',
    equipReqs: ['ranged_50'],
    image: 'https://oldschool.runescape.wiki/images/Magic_shortbow_%28i%29.png',
  },
  blowpipe_ranged: {
    _equipmentId: 'tanzanite_fang',
    slot: 'weapon', style: 'ranged', priority: 9, ammoType: 'dart',
    name: 'Toxic Blowpipe',
    equipReqs: ['ranged_75'],
    image: 'https://oldschool.runescape.wiki/images/Toxic_blowpipe.png',
  },
  armadyl_cbow_ranged: {
    _unlockRef: 'armadyl_cbow',
    slot: 'weapon', style: 'ranged', priority: 8, ammoType: 'bolt',
    name: 'Armadyl Crossbow',
    equipReqs: ['ranged_70'],
    image: 'https://oldschool.runescape.wiki/images/Armadyl_crossbow.png',
  },
  dhcb_ranged: {
    _unlockRef: 'dhcb',
    slot: 'weapon', style: 'ranged', priority: 10, ammoType: 'bolt',
    name: 'Dragon Hunter Crossbow',
    equipReqs: ['ranged_70'],
    image: 'https://oldschool.runescape.wiki/images/Dragon_hunter_crossbow.png',
  },
  void_ranged_body: {
    _unlockRef: 'void_ranged',
    slot: 'body', style: 'ranged', priority: 6,
    name: 'Void Knight Top',
    equipReqs: ['ranged_40', 'defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Void_knight_top.png',
  },
  armadyl_body: {
    _unlockRef: 'armadyl_armor',
    slot: 'body', style: 'ranged', priority: 9,
    name: 'Armadyl Chestplate',
    equipReqs: ['ranged_70', 'defence_70'],
    image: 'https://oldschool.runescape.wiki/images/Armadyl_chestplate.png',
  },
  armadyl_legs: {
    _unlockRef: 'armadyl_armor',
    slot: 'legs', style: 'ranged', priority: 9,
    name: 'Armadyl Chainskirt',
    equipReqs: ['ranged_70', 'defence_70'],
    image: 'https://oldschool.runescape.wiki/images/Armadyl_chainskirt.png',
  },
  ranger_boots_ranged: {
    _unlockRef: 'ranger_boots',
    slot: 'feet', style: 'ranged', priority: 8,
    name: 'Ranger Boots',
    equipReqs: ['ranged_40'],
    image: 'https://oldschool.runescape.wiki/images/Ranger_boots.png',
  },
  archers_ring_ranged: {
    _unlockRef: 'archers_ring',
    slot: 'ring', style: 'ranged', priority: 8,
    name: "Archers' Ring (i)",
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Archers_ring_%28i%29.png',
  },
  // equipment-shop ranged
  archers_ring_eq:       { _equipmentId: 'archers_ring',  slot: 'ring',   style: 'ranged', priority: 8, equipReqs: [], name: "Archers' Ring",     image: 'https://oldschool.runescape.wiki/images/Archers_ring.png' },
  karils_body_eq:        { _equipmentId: 'karils_set',    slot: 'body',   style: 'ranged', priority: 7, equipReqs: [], name: "Karil's Leathertop",image: 'https://oldschool.runescape.wiki/images/Karil%27s_leathertop.png' },
  karils_legs_eq:        { _equipmentId: 'karils_set',    slot: 'legs',   style: 'ranged', priority: 7, equipReqs: [], name: "Karil's Leatherskirt",image: 'https://oldschool.runescape.wiki/images/Karil%27s_leatherskirt.png' },
  barrows_gloves_range_eq: { _equipmentId: 'barrows_gloves', slot: 'hands', style: 'ranged', priority: 9, equipReqs: [], name: 'Barrows Gloves', image: 'https://oldschool.runescape.wiki/images/Barrows_gloves.png' },

  // ══════════════════════════════════════════════════════════════════════════
  // MAGE
  // ══════════════════════════════════════════════════════════════════════════

  trident_mage: {
    _unlockRef: 'trident',
    slot: 'weapon', style: 'mage', priority: 7,
    name: 'Trident of the Seas',
    equipReqs: ['magic_75'],
    image: 'https://oldschool.runescape.wiki/images/Trident_of_the_seas.png',
  },
  sang_staff_mage: {
    _unlockRef: 'sang_staff',
    slot: 'weapon', style: 'mage', priority: 10,
    name: 'Sanguinesti Staff',
    equipReqs: ['magic_75'],
    image: 'https://oldschool.runescape.wiki/images/Sanguinesti_staff.png',
  },
  mages_book_mage: {
    _unlockRef: 'mages_book',
    slot: 'shield', style: 'mage', priority: 6,
    name: "Mage's Book",
    equipReqs: ['magic_55'],
    image: "https://oldschool.runescape.wiki/images/Mage%27s_book.png",
  },
  void_mage_body: {
    _unlockRef: 'void_mage',
    slot: 'body', style: 'mage', priority: 5,
    name: 'Void Knight Top (Mage)',
    equipReqs: ['magic_55', 'defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Void_knight_top.png',
  },
  ancestral_body: {
    _unlockRef: 'ancestral_armor',
    slot: 'body', style: 'mage', priority: 10,
    name: 'Ancestral Robe Top',
    equipReqs: ['magic_75', 'defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Ancestral_robe_top.png',
  },
  ancestral_legs: {
    _unlockRef: 'ancestral_armor',
    slot: 'legs', style: 'mage', priority: 10,
    name: 'Ancestral Robe Bottom',
    equipReqs: ['magic_75', 'defence_40'],
    image: 'https://oldschool.runescape.wiki/images/Ancestral_robe_bottom.png',
  },
  occult_neck: {
    _unlockRef: 'occult',
    _equipmentId: 'occult_necklace',
    slot: 'neck', style: 'mage', priority: 9,
    name: 'Occult Necklace',
    equipReqs: ['magic_55'],
    image: 'https://oldschool.runescape.wiki/images/Occult_necklace.png',
  },
  // equipment-shop mage weapons
  fire_staff_eq:        { _equipmentId: 'fire_staff',        slot: 'weapon', style: 'mage', priority: 2, equipReqs: [], name: 'Fire Staff',        image: 'https://oldschool.runescape.wiki/images/Fire_staff.png' },
  bryophyta_staff_eq:   { _equipmentId: 'bryophyta_staff',   slot: 'weapon', style: 'mage', priority: 4, equipReqs: [], name: "Bryophyta's Staff", image: 'https://oldschool.runescape.wiki/images/Bryophyta%27s_staff.png' },
  fire_battlestaff_eq:  { _equipmentId: 'fire_battlestaff',  slot: 'weapon', style: 'mage', priority: 5, equipReqs: [], name: 'Fire Battlestaff',  image: 'https://oldschool.runescape.wiki/images/Fire_battlestaff.png' },
  ancient_staff_eq:     { _equipmentId: 'ancient_staff',     slot: 'weapon', style: 'mage', priority: 5, equipReqs: [], name: 'Ancient Staff',     image: 'https://oldschool.runescape.wiki/images/Ancient_staff.png' },
  dust_battlestaff_eq:  { _equipmentId: 'dust_battlestaff',  slot: 'weapon', style: 'mage', priority: 6, equipReqs: [], name: 'Dust Battlestaff',  image: 'https://oldschool.runescape.wiki/images/Dust_battlestaff.png' },
  mud_battlestaff_eq:   { _equipmentId: 'mud_battlestaff',   slot: 'weapon', style: 'mage', priority: 7, equipReqs: [], name: 'Mud Battlestaff',   image: 'https://oldschool.runescape.wiki/images/Mud_battlestaff.png' },
  // equipment-shop mage armour
  mystic_gloves_light_eq:  { _equipmentId: 'mystic_gloves_light', slot: 'hands', style: 'mage', priority: 2, equipReqs: [], name: 'Mystic Gloves (light)', image: 'https://oldschool.runescape.wiki/images/Mystic_gloves_(light).png' },
  mystic_gloves_dark_eq:   { _equipmentId: 'mystic_gloves_dark',  slot: 'hands', style: 'mage', priority: 3, equipReqs: [], name: 'Mystic Gloves (dark)',  image: 'https://oldschool.runescape.wiki/images/Mystic_gloves_(dark).png' },
  barrows_gloves_mage_eq:  { _equipmentId: 'barrows_gloves',      slot: 'hands', style: 'mage', priority: 9, equipReqs: [], name: 'Barrows Gloves',        image: 'https://oldschool.runescape.wiki/images/Barrows_gloves.png' },
  mystic_dark_top_eq:      { _equipmentId: 'mystic_dark_top',     slot: 'body',  style: 'mage', priority: 4, equipReqs: [], name: 'Mystic Top (dark)',      image: 'https://oldschool.runescape.wiki/images/Mystic_top_(dark).png' },
  mystic_dark_bottom_eq:   { _equipmentId: 'mystic_dark_bottom',  slot: 'legs',  style: 'mage', priority: 4, equipReqs: [], name: 'Mystic Bottom (dark)',   image: 'https://oldschool.runescape.wiki/images/Mystic_bottom_(dark).png' },
  ahrims_set_body_eq:      { _equipmentId: 'ahrims_set',          slot: 'body',  style: 'mage', priority: 8, equipReqs: [], name: "Ahrim's Robetop",        image: "https://oldschool.runescape.wiki/images/Ahrim%27s_robetop.png" },
  ahrims_set_legs_eq:      { _equipmentId: 'ahrims_set',          slot: 'legs',  style: 'mage', priority: 8, equipReqs: [], name: "Ahrim's Robeskirt",       image: "https://oldschool.runescape.wiki/images/Ahrim%27s_robeskirt.png" },
  seers_ring_eq:           { _equipmentId: 'seers_ring',          slot: 'ring',  style: 'mage', priority: 8, equipReqs: [], name: "Seers' Ring",             image: 'https://oldschool.runescape.wiki/images/Seers_ring.png' },
  occult_necklace_eq:      { _equipmentId: 'occult_necklace',     slot: 'neck',  style: 'mage', priority: 9, equipReqs: [], name: 'Occult Necklace',         image: 'https://oldschool.runescape.wiki/images/Occult_necklace.png' },

  // ── Itens faltando por estilo ──────────────────────────────────────────────

  // Melee — boots
  bronze_boots_eq:   { _equipmentId: 'bronze_boots',   slot: 'feet',   style: 'melee', priority: 1, equipReqs: [], name: 'Bronze Boots',   image: 'https://oldschool.runescape.wiki/images/Bronze_boots.png' },
  climbing_boots_eq: { _equipmentId: 'climbing_boots', slot: 'feet',   style: 'melee', priority: 2, equipReqs: [], name: 'Climbing Boots', image: 'https://oldschool.runescape.wiki/images/Climbing_boots.png' },

  // Melee — head
  black_mask_eq:       { _equipmentId: 'black_mask',       slot: 'head', style: 'melee', priority: 7, equipReqs: [], name: 'Black Mask',       image: 'https://oldschool.runescape.wiki/images/Black_mask.png' },
  adamant_full_helm_eq:{ _equipmentId: 'adamant_full_helm', slot: 'head', style: 'melee', priority: 5, equipReqs: [], name: 'Adamant Full Helm', image: 'https://oldschool.runescape.wiki/images/Adamant_full_helm.png' },

  // Melee — legs
  adamant_platelegs_eq:{ _equipmentId: 'adamant_platelegs', slot: 'legs', style: 'melee', priority: 5, equipReqs: [], name: 'Adamant Platelegs', image: 'https://oldschool.runescape.wiki/images/Adamant_platelegs.png' },

  // Melee — weapons
  granite_maul_eq:  { _equipmentId: 'granite_maul',  slot: 'weapon', style: 'melee', priority: 7, equipReqs: [], name: 'Granite Maul',  image: 'https://oldschool.runescape.wiki/images/Granite_maul.png' },
  dragon_sword_eq:  { _equipmentId: 'dragon_sword',  slot: 'weapon', style: 'melee', priority: 6, equipReqs: ['attack_60'], name: 'Dragon Sword',  image: 'https://oldschool.runescape.wiki/images/Dragon_sword.png' },
  dragon_spear_eq:  { _equipmentId: 'dragon_spear',  slot: 'weapon', style: 'melee', priority: 5, equipReqs: ['attack_60'], name: 'Dragon Spear',  image: 'https://oldschool.runescape.wiki/images/Dragon_spear.png' },

  // Barrows sets — melee (body slot como representação do set)
  dharoks_set_body_eq: { _equipmentId: 'dharoks_set', slot: 'body', style: 'melee', priority: 8, equipReqs: [], name: "Dharok's Set",  image: "https://oldschool.runescape.wiki/images/Dharok%27s_platebody.png" },
  dharoks_set_legs_eq: { _equipmentId: 'dharoks_set', slot: 'legs', style: 'melee', priority: 8, equipReqs: [], name: "Dharok's Set",  image: "https://oldschool.runescape.wiki/images/Dharok%27s_platelegs.png" },
  guthans_set_eq:      { _equipmentId: 'guthans_set', slot: 'body', style: 'melee', priority: 7, equipReqs: [], name: "Guthan's Set",  image: "https://oldschool.runescape.wiki/images/Guthan%27s_platebody.png" },
  veracs_set_eq:       { _equipmentId: 'veracs_set',  slot: 'body', style: 'melee', priority: 7, equipReqs: [], name: "Verac's Set",   image: "https://oldschool.runescape.wiki/images/Verac%27s_brassard.png" },
  torags_set_eq:       { _equipmentId: 'torags_set',  slot: 'body', style: 'melee', priority: 7, equipReqs: [], name: "Torag's Set",   image: "https://oldschool.runescape.wiki/images/Torag%27s_platebody.png" },

  // Ring — híbrido (aparece nos 3 estilos)
  brimstone_ring_melee_eq:  { _equipmentId: 'brimstone_ring', slot: 'ring', style: 'melee',  priority: 7, equipReqs: [], name: 'Brimstone Ring', image: 'https://oldschool.runescape.wiki/images/Brimstone_ring.png' },
  brimstone_ring_ranged_eq: { _equipmentId: 'brimstone_ring', slot: 'ring', style: 'ranged', priority: 7, equipReqs: [], name: 'Brimstone Ring', image: 'https://oldschool.runescape.wiki/images/Brimstone_ring.png' },
  brimstone_ring_mage_eq:   { _equipmentId: 'brimstone_ring', slot: 'ring', style: 'mage',   priority: 7, equipReqs: [], name: 'Brimstone Ring', image: 'https://oldschool.runescape.wiki/images/Brimstone_ring.png' },

  // Ranged — weapon
  dorgeshuun_crossbow_eq: { _equipmentId: 'dorgeshuun_crossbow', slot: 'weapon', style: 'ranged', priority: 3, ammoType: 'bolt', equipReqs: [], name: 'Dorgeshuun Crossbow', image: 'https://oldschool.runescape.wiki/images/Dorgeshuun_crossbow.png' },

  // ── Cape ──────────────────────────────────────────────────────────────────
  fire_cape_eq:     { _equipmentId: 'fire_cape',     slot: 'cape', style: 'melee',  priority: 8,  equipReqs: [], name: 'Fire Cape',     image: 'https://oldschool.runescape.wiki/images/Fire_cape.png' },
  infernal_cape_eq: { _equipmentId: 'infernal_cape', slot: 'cape', style: 'melee',  priority: 10, equipReqs: [], name: 'Infernal Cape', image: 'https://oldschool.runescape.wiki/images/Infernal_cape.png' },

  // ── Boots BIS top-tier (cerberus) ─────────────────────────────────────────
  primordial_boots_eq: { _equipmentId: 'primordial_crystal', slot: 'feet', style: 'melee',  priority: 10, equipReqs: ['defence_60'], name: 'Primordial Boots', image: 'https://oldschool.runescape.wiki/images/Primordial_boots.png' },
  pegasian_boots_eq:   { _equipmentId: 'pegasian_crystal',   slot: 'feet', style: 'ranged', priority: 10, equipReqs: ['defence_60'], name: 'Pegasian Boots',   image: 'https://oldschool.runescape.wiki/images/Pegasian_boots.png' },
  eternal_boots_eq:    { _equipmentId: 'eternal_crystal',    slot: 'feet', style: 'mage',   priority: 10, equipReqs: ['defence_60'], name: 'Eternal Boots',    image: 'https://oldschool.runescape.wiki/images/Eternal_boots.png' },

  // ── Varlamore — Perilous Moons (mid-game sets) ─────────────────────────────
  blood_moon_head_eq:   { _equipmentId: 'blood_moon_set',   slot: 'head', style: 'melee',  priority: 8, equipReqs: ['defence_70'], name: 'Blood Moon Helm',             image: 'https://oldschool.runescape.wiki/images/Blood_moon_helm.png' },
  blood_moon_body_eq:   { _equipmentId: 'blood_moon_set',   slot: 'body', style: 'melee',  priority: 8, equipReqs: ['defence_70'], name: 'Blood Moon Chestplate',        image: 'https://oldschool.runescape.wiki/images/Blood_moon_chestplate.png' },
  blood_moon_legs_eq:   { _equipmentId: 'blood_moon_set',   slot: 'legs', style: 'melee',  priority: 8, equipReqs: ['defence_70'], name: 'Blood Moon Tassets',           image: 'https://oldschool.runescape.wiki/images/Blood_moon_tassets.png' },

  eclipse_moon_head_eq: { _equipmentId: 'eclipse_moon_set', slot: 'head', style: 'ranged', priority: 8, equipReqs: ['ranged_60', 'defence_60'], name: 'Eclipse Moon Helm',   image: 'https://oldschool.runescape.wiki/images/Eclipse_moon_helm.png' },
  eclipse_moon_body_eq: { _equipmentId: 'eclipse_moon_set', slot: 'body', style: 'ranged', priority: 8, equipReqs: ['ranged_60', 'defence_60'], name: 'Eclipse Moon Body',   image: 'https://oldschool.runescape.wiki/images/Eclipse_moon_body.png' },
  eclipse_moon_legs_eq: { _equipmentId: 'eclipse_moon_set', slot: 'legs', style: 'ranged', priority: 8, equipReqs: ['ranged_60', 'defence_60'], name: 'Eclipse Moon Legs',   image: 'https://oldschool.runescape.wiki/images/Eclipse_moon_legs.png' },

  blue_moon_head_eq:    { _equipmentId: 'blue_moon_set',    slot: 'head', style: 'mage',   priority: 9, equipReqs: ['magic_60', 'defence_60'],  name: 'Blue Moon Helm',           image: 'https://oldschool.runescape.wiki/images/Blue_moon_helm.png' },
  blue_moon_body_eq:    { _equipmentId: 'blue_moon_set',    slot: 'body', style: 'mage',   priority: 9, equipReqs: ['magic_60', 'defence_60'],  name: 'Blue Moon Spell Robe',     image: 'https://oldschool.runescape.wiki/images/Blue_moon_spell_robe.png' },
  blue_moon_legs_eq:    { _equipmentId: 'blue_moon_set',    slot: 'legs', style: 'mage',   priority: 9, equipReqs: ['magic_60', 'defence_60'],  name: 'Blue Moon Spell Robe Legs',image: 'https://oldschool.runescape.wiki/images/Blue_moon_spell_robe_legs.png' },

  // ── Varlamore — endgame (Delve Mokha) ────────────────────────────────────────
  avernic_treads_melee_eq:  { _equipmentId: 'avernic_treads', slot: 'feet',  style: 'melee',  priority: 11, equipReqs: ['defence_75'], name: 'Avernic Treads', image: 'https://oldschool.runescape.wiki/images/Avernic_treads.png' },
  avernic_treads_ranged_eq: { _equipmentId: 'avernic_treads', slot: 'feet',  style: 'ranged', priority: 11, equipReqs: ['defence_75'], name: 'Avernic Treads', image: 'https://oldschool.runescape.wiki/images/Avernic_treads.png' },
  avernic_treads_mage_eq:   { _equipmentId: 'avernic_treads', slot: 'feet',  style: 'mage',   priority: 11, equipReqs: ['defence_75'], name: 'Avernic Treads', image: 'https://oldschool.runescape.wiki/images/Avernic_treads.png' },

  confliction_gauntlets_melee_eq:  { _equipmentId: 'confliction_gauntlets', slot: 'hands', style: 'melee',  priority: 11, equipReqs: ['defence_70'], name: 'Confliction Gauntlets', image: 'https://oldschool.runescape.wiki/images/Confliction_gauntlets.png' },
  confliction_gauntlets_ranged_eq: { _equipmentId: 'confliction_gauntlets', slot: 'hands', style: 'ranged', priority: 11, equipReqs: ['defence_70'], name: 'Confliction Gauntlets', image: 'https://oldschool.runescape.wiki/images/Confliction_gauntlets.png' },
  confliction_gauntlets_mage_eq:   { _equipmentId: 'confliction_gauntlets', slot: 'hands', style: 'mage',   priority: 11, equipReqs: ['defence_70'], name: 'Confliction Gauntlets', image: 'https://oldschool.runescape.wiki/images/Confliction_gauntlets.png' },

  eye_of_ayak_eq: { _equipmentId: 'eye_of_ayak', slot: 'weapon', style: 'mage', priority: 9, equipReqs: ['magic_75'], name: 'Eye of Ayak', image: 'https://oldschool.runescape.wiki/images/Eye_of_ayak.png' },

  sunlight_crossbow_eq: { _equipmentId: 'sunlight_crossbow', slot: 'weapon', style: 'ranged', priority: 6, ammoType: 'bolt', equipReqs: ['ranged_50'], name: "Sunlight Hunter's Crossbow", image: "https://oldschool.runescape.wiki/images/Hunters%27_sunlight_crossbow_detail.png" },

  // ── Sailing — Rosewood Blowpipe ───────────────────────────────────────────
  rosewood_blowpipe_eq: { _equipmentId: 'rosewood_blowpipe', slot: 'weapon', style: 'ranged', priority: 7, ammoType: 'dart', equipReqs: [], name: 'Rosewood Blowpipe', image: 'https://oldschool.runescape.wiki/images/Rosewood_blowpipe.png' },

  // ── Thrown darts — fallback no Check BIS quando não há blowpipe disponível ─
  // Não aparecem no BIS normal (não são rastreados como equip) mas aparecem no
  // getIdealBIS pois este ignora posse e verifica só nível.
  steel_dart_thrown:   { slot: 'weapon', style: 'ranged', priority: 2, ammoType: 'dart', equipReqs: [], name: 'Steel Dart',   image: 'https://oldschool.runescape.wiki/images/Steel_dart.png' },
  adamant_dart_thrown: { slot: 'weapon', style: 'ranged', priority: 3, ammoType: 'dart', equipReqs: [], name: 'Adamant Dart', image: 'https://oldschool.runescape.wiki/images/Adamant_dart.png' },
  rune_dart_thrown:    { slot: 'weapon', style: 'ranged', priority: 4, ammoType: 'dart', equipReqs: [], name: 'Rune Dart',    image: 'https://oldschool.runescape.wiki/images/Rune_dart.png' },
  dragon_dart_thrown:  { slot: 'weapon', style: 'ranged', priority: 6, ammoType: 'dart', equipReqs: ['ranged_60'], name: 'Dragon Dart', image: 'https://oldschool.runescape.wiki/images/Dragon_dart.png' },
}

// ─────────────────────────────────────────────────────────────────────────────
// getIdealBIS — retorna o melhor item possível por slot/style baseado apenas
// nos níveis reais do jogador, independente de ter o item ou não.
// Usado para o modo "Check BIS" que mostra o loadout ideal vs o que o jogador tem.
// ─────────────────────────────────────────────────────────────────────────────
export function getIdealBIS(style, realLevels = {}, ammoFilter = null) {
  const slots = ['head','cape','neck','ammo','weapon','body','shield','legs','hands','feet','ring']
  const result = {}
  for (const slot of slots) {
    let candidates = Object.entries(BIS)
      .filter(([, item]) => item.slot === slot && item.style === style)
    if (ammoFilter && slot === 'weapon') {
      candidates = candidates.filter(([, item]) => item.ammoType === ammoFilter)
    }
    candidates = candidates.filter(([, item]) => (item.equipReqs ?? []).every(req => {
      const m = req.match(/^([a-z]+)_(\d+)$/)
      if (!m) return false
      const skill = m[1].charAt(0).toUpperCase() + m[1].slice(1)
      return (realLevels?.[skill] ?? 0) >= parseInt(m[2], 10)
    }))
    if (candidates.length === 0) { result[slot] = null; continue }
    const best = candidates.reduce((a, b) => b[1].priority > a[1].priority ? b : a)
    result[slot] = { ...best[1], unlockKey: best[0] }
  }
  return result
}

// ─────────────────────────────────────────────────────────────────────────────
// getBIS — retorna o melhor item disponível por slot/style
// unlocked: Set de unlock IDs (missões/quests/skills)
// obtainedEquipment: Set de equipment IDs comprados na loja PAM
// ─────────────────────────────────────────────────────────────────────────────
export function getBIS(style, unlocked, obtainedEquipment = new Set(), realLevels = {}, ammoFilter = null) {
  const slots = ['head','cape','neck','ammo','weapon','body','shield','legs','hands','feet','ring']
  const result = {}

  for (const slot of slots) {
    let candidates = Object.entries(BIS)
      .filter(([, item]) => item.slot === slot && item.style === style)
    if (ammoFilter && slot === 'weapon') {
      candidates = candidates.filter(([, item]) => item.ammoType === ammoFilter)
    }
    candidates = candidates.filter(([key, item]) => {
        const unlockId = item._unlockRef ?? key
        const equipId  = item._equipmentId ?? unlockId

        const hasViaUnlock = unlocked.has(unlockId)
        const hasViaEquip  = obtainedEquipment.has(equipId)
        if (!hasViaUnlock && !hasViaEquip) return false

        return (item.equipReqs ?? []).every(req => {
          if (unlocked.has(req)) return true
          const match = req.match(/^([a-z]+)_(\d+)$/)
          if (!match) return false
          const capSkill = match[1].charAt(0).toUpperCase() + match[1].slice(1)
          return (realLevels?.[capSkill] ?? 0) >= parseInt(match[2], 10)
        })
      })

    if (candidates.length === 0) { result[slot] = null; continue }

    const best = candidates.reduce((a, b) => b[1].priority > a[1].priority ? b : a)
    const bestUnlockId = best[1]._unlockRef ?? best[0]
    result[slot] = { ...best[1], unlockKey: best[0], _source: unlocked.has(bestUnlockId) ? 'unlock' : 'equip' }
  }

  return result
}
