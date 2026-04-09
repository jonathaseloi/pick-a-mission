// ─────────────────────────────────────────────────────────────────────────────
// BIS — Best in Slot por estilo de combate
//
// Cada entrada mapeia um unlock_id para um slot de equipamento.
// priority: quanto maior, melhor o item (usado para encontrar o BIS)
// equipReqs: unlock IDs de skill que o jogador precisa ter para equipar
// image: URL da wiki do OSRS
//
// Slots: head | cape | neck | ammo | weapon | body | shield | legs | hands | feet | ring
// Styles: melee | ranged | mage
// ─────────────────────────────────────────────────────────────────────────────

export const BIS = {

  // ══════════════════════════════════════════════════════════════════════════
  // MELEE
  // ══════════════════════════════════════════════════════════════════════════

  // Head
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

  // Body
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

  // Legs
  barrows_legs: {
    _unlockRef: 'barrows_armor',
    slot: 'legs', style: 'melee', priority: 7,
    name: 'Torag\'s Platelegs',
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

  // Weapon
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
    slot: 'weapon', style: 'melee', priority: 4,
    name: 'Giant Club',
    equipReqs: ['strength_40'],
    image: 'https://oldschool.runescape.wiki/images/Giant_club.png',
  },
  d_scimitar: {
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

  // Shield
  mithril_shield: {
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

  // Boots
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

  // Ring
  berserker_ring: {
    slot: 'ring', style: 'melee', priority: 8,
    name: 'Berserker Ring (i)',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Berserker_ring_%28i%29.png',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RANGED
  // ══════════════════════════════════════════════════════════════════════════

  shortbow_ranged: {
    _unlockRef: 'shortbow',
    slot: 'weapon', style: 'ranged', priority: 1,
    name: 'Shortbow',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Shortbow.png',
  },
  oak_shortbow_ranged: {
    _unlockRef: 'oak_shortbow',
    slot: 'weapon', style: 'ranged', priority: 2,
    name: 'Oak Shortbow',
    equipReqs: ['ranged_40'],
    image: 'https://oldschool.runescape.wiki/images/Oak_shortbow.png',
  },
  maple_shortbow_ranged: {
    _unlockRef: 'maple_shortbow',
    slot: 'weapon', style: 'ranged', priority: 4,
    name: 'Maple Shortbow',
    equipReqs: ['ranged_40'],
    image: 'https://oldschool.runescape.wiki/images/Maple_shortbow.png',
  },
  magic_shortbow_ranged: {
    _unlockRef: 'magic_shortbow',
    slot: 'weapon', style: 'ranged', priority: 6,
    name: 'Magic Shortbow (i)',
    equipReqs: ['ranged_50'],
    image: 'https://oldschool.runescape.wiki/images/Magic_shortbow_%28i%29.png',
  },
  blowpipe_ranged: {
    _unlockRef: 'blowpipe',
    slot: 'weapon', style: 'ranged', priority: 9,
    name: 'Toxic Blowpipe',
    equipReqs: ['ranged_75'],
    image: 'https://oldschool.runescape.wiki/images/Toxic_blowpipe.png',
  },
  armadyl_cbow_ranged: {
    _unlockRef: 'armadyl_cbow',
    slot: 'weapon', style: 'ranged', priority: 8,
    name: 'Armadyl Crossbow',
    equipReqs: ['ranged_70'],
    image: 'https://oldschool.runescape.wiki/images/Armadyl_crossbow.png',
  },
  dhcb_ranged: {
    _unlockRef: 'dhcb',
    slot: 'weapon', style: 'ranged', priority: 10,
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
    name: 'Archers Ring (i)',
    equipReqs: [],
    image: 'https://oldschool.runescape.wiki/images/Archers_ring_%28i%29.png',
  },

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
    image: 'https://oldschool.runescape.wiki/images/Mage%27s_book.png',
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
    slot: 'neck', style: 'mage', priority: 9,
    name: 'Occult Necklace',
    equipReqs: ['magic_55'],
    image: 'https://oldschool.runescape.wiki/images/Occult_necklace.png',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// getBIS — retorna o melhor item desbloqueado + equipável por slot/style
// unlocked: Set de unlock IDs que o jogador possui
// ─────────────────────────────────────────────────────────────────────────────
export function getBIS(style, unlocked) {
  const slots = ['head','cape','neck','ammo','weapon','body','shield','legs','hands','feet','ring']
  const result = {}

  for (const slot of slots) {
    // Filtra itens do slot/style corretos
    const candidates = Object.entries(BIS)
      .filter(([, item]) => item.slot === slot && item.style === style)
      .filter(([key, item]) => {
        // Resolve o unlock ID real (usa _unlockRef se existir, senão a própria key)
        const unlockId = item._unlockRef ?? key
        // Item precisa estar desbloqueado
        if (!unlocked.has(unlockId)) return false
        // Todos os skill reqs precisam estar desbloqueados
        return (item.equipReqs ?? []).every(req => unlocked.has(req))
      })

    if (candidates.length === 0) { result[slot] = null; continue }

    // Pega o de maior priority
    const best = candidates.reduce((a, b) => b[1].priority > a[1].priority ? b : a)
    result[slot] = { ...best[1], unlockKey: best[0] }
  }

  return result
}