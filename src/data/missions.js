// ─────────────────────────────────────────────────────────────────────────────
// MISSIONS — Fase 4 — baseadas nos guias de Ironman (Oziris/Settled)
//
// chapter:  1–6  (progressão do Ironman)
// path:     'main' | 'side'
//           main = caminho crítico do capítulo (avança o jogo)
//           side = conteúdo paralelo útil mas não bloqueante
// category: Quest | Skilling | Boss | Slayer | Minigame | Farming | Dungeon
//           | Combat Achievement | Diary
// req:      IDs de unlock OU 'skill_nivel' checado vs realLevels do OSRS API
//           ex: 'q_ds1' = completou missão DS1 no PAM
//               'prayer_43' = Prayer >= 43 no jogo (auto via API)
// reward:   unlock concedido ao completar (null para missões de farm puro)
// coins:    PAM coins ganhos
// huntUnlock: ID de monstro desbloqueado gratuitamente para huntar
// reroll:   tokens de re-roll ganhos
// priority: 1–10 — define a ordem da carta "principal" (card1)
// ─────────────────────────────────────────────────────────────────────────────

export const MISSIONS = [

  // ══════════════════════════════════════════════════════════════════════════
  // CAPÍTULO 1 — PRIMEIROS PASSOS
  // Meta: sobreviver, completar quests iniciais, desbloquear Slayer e DS I
  // ══════════════════════════════════════════════════════════════════════════

  // ── Main ──────────────────────────────────────────────────────────────────
  {
    id: 'm1_01', chapter: 1, path: 'main', category: 'Quest', priority: 10,
    title: 'Waterfall Quest',
    desc: '13.750 XP de Attack e Strength instantâneos.',
    req: [],
    reward: 'q_waterfall',
    coins: 80,
  },
  {
    id: 'm1_02', chapter: 1, path: 'main', category: 'Minigame', priority: 9,
    title: 'Wintertodt',
    desc: 'Firemaking 50 e completar 10 runs de Wintertodt.',
    req: [],
    reward: 'a_wintertodt',
    coins: 30,
  },
  {
    id: 'm1_03', chapter: 1, path: 'main', category: 'Slayer', priority: 8,
    title: 'Slayer',
    desc: '20 tarefas com Turael ou Spria.',
    req: [],
    reward: 'a_slayer',
    coins: 25,
    huntUnlock: 'bryophyta',
  },
  {
    id: 'm1_04', chapter: 1, path: 'main', category: 'Quest', priority: 9,
    title: 'Priest in Peril',
    desc: 'Completar Priest in Peril — acesso a Morytania e Ectofuntus.',
    req: ['q_waterfall'],
    reward: 'q_priest_peril',
    coins: 35,
  },
  {
    id: 'm1_05', chapter: 1, path: 'main', category: 'Quest', priority: 10, chapterFinal: true,
    title: 'Dragon Slayer I',
    desc: 'Completar Dragon Slayer I (~32 Quest Points necessários).',
    req: ['q_waterfall', 'q_cooks_assistant'],
    reward: 'q_ds1',
    coins: 50,
    reroll: 1,
  },

  // ── Side ──────────────────────────────────────────────────────────────────
  {
    id: 'm1_06', chapter: 1, path: 'side', category: 'Quest', priority: 5,
    title: "Cook's Assistant",
    desc: "Completar Cook's Assistant.",
    req: [],
    reward: 'q_cooks_assistant',
    coins: 50,
  },
  {
    id: 'm1_07', chapter: 1, path: 'side', category: 'Quest', priority: 4,
    title: 'Rune Mysteries',
    desc: 'Completar Rune Mysteries e Sheep Shearer.',
    req: [],
    reward: 'q_rune_mysteries',
    coins: 20,
  },
  {
    id: 'm1_08', chapter: 1, path: 'side', category: 'Quest', priority: 3,
    title: "Doric's Quest",
    desc: "Completar Doric's Quest.",
    req: [],
    reward: 'q_dorics',
    coins: 50,
  },
  {
    id: 'm1_09', chapter: 1, path: 'side', category: 'Dungeon', priority: 5,
    title: 'Stronghold of Security',
    desc: 'Completar os 4 andares — 10.000 gp e Climbing Boots.',
    req: [],
    reward: 'q_stronghold',
    coins: 60,
  },
  {
    id: 'm1_10', chapter: 1, path: 'side', category: 'Quest', priority: 7,
    title: "Knight's Sword",
    desc: "Completar Knight's Sword — 12.725 XP de Smithing.",
    req: [],
    reward: 'q_knights_sword',
    coins: 70,
  },
  {
    id: 'm1_11', chapter: 1, path: 'side', category: 'Skilling', priority: 6,
    title: 'Fishing',
    desc: 'Atingir Fishing 40 (Shrimps → Sardines → Trout).',
    req: [],
    reward: 'fishing_40',
    coins: 20,
  },
  {
    id: 'm1_12', chapter: 1, path: 'side', category: 'Quest', priority: 8,
    title: 'Druidic Ritual',
    desc: 'Completar Druidic Ritual.',
    req: [],
    reward: 'q_druidic',
    coins: 20,
  },
  {
    id: 'm1_13', chapter: 1, path: 'side', category: 'Farming', priority: 5,
    title: 'Bird House Runs',
    desc: 'Configurar Bird House runs no Fossil Island (Hunter 5, Crafting 5).',
    req: [],
    reward: 'a_birdhouse',
    coins: 20,
  },
  {
    id: 'm1_14', chapter: 1, path: 'side', category: 'Quest', priority: 8,
    title: 'Fairytale Part I',
    desc: 'Completar Fairytale Pt. I — Growing Pains.',
    req: ['q_priest_peril'],
    reward: 'q_fairytale1',
    coins: 30,
  },
  {
    id: 'm1_15', chapter: 1, path: 'side', category: 'Quest', priority: 4,
    title: 'Plague City / Biohazard',
    desc: 'Completar Plague City e Biohazard.',
    req: ['q_priest_peril'],
    reward: 'q_biohazard',
    coins: 25,
  },
  {
    id: 'm1_16', chapter: 1, path: 'side', category: 'Skilling', priority: 4,
    title: 'Mining',
    desc: 'Atingir Mining 40 em iron e coal.',
    req: [],
    reward: 'mining_40',
    coins: 20,
  },
  {
    id: 'm1_17', chapter: 1, path: 'side', category: 'Skilling', priority: 5,
    title: 'Thieving',
    desc: 'Atingir Thieving 38 com Men e Master Farmers.',
    req: [],
    reward: 'thieving_38',
    coins: 25,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAPÍTULO 2 — FUNDAÇÃO DO IRONMAN
  // Meta: Dragon Scim, Prayer 43, Blowpipe, Barrows
  // ══════════════════════════════════════════════════════════════════════════

  // ── Main ──────────────────────────────────────────────────────────────────
  {
    id: 'm2_01', chapter: 2, path: 'main', category: 'Quest', priority: 10,
    title: 'Monkey Madness I',
    desc: 'Completar Monkey Madness I — Dragon Scimitar desbloqueada.',
    req: ['q_ds1', 'q_fairytale1'],
    reward: 'q_mm1',
    coins: 60,
    reroll: 1,
    huntUnlock: 'demonic_gorillas',
  },
  {
    id: 'm2_02', chapter: 2, path: 'main', category: 'Skilling', priority: 10,
    title: 'Prayer',
    desc: 'Atingir Prayer 43 via Ectofuntus com Dragon Bones.',
    req: ['q_priest_peril'],
    reward: 'prayer_43',
    coins: 50,
  },
  {
    id: 'm2_03', chapter: 2, path: 'main', category: 'Minigame', priority: 9,
    title: 'Barbarian Assault',
    desc: 'Completar Barbarian Assault — Fighter Torso.',
    req: ['q_mm1'],
    reward: 'i_fighter_torso',
    coins: 60,
  },
  {
    id: 'm2_04', chapter: 2, path: 'main', category: 'Quest', priority: 9,
    title: 'Regicide',
    desc: 'Completar Regicide.',
    req: ['q_mm1', 'prayer_43', 'q_biohazard'],
    reward: 'q_regicide',
    coins: 55,
    huntUnlock: 'zulrah',
  },
  {
    id: 'm2_05', chapter: 2, path: 'main', category: 'Quest', priority: 8,
    title: 'Recipe for Disaster',
    desc: 'Completar Recipe for Disaster (subquests iniciais) — Mithril Gloves.',
    req: ['q_cooks_assistant', 'q_waterfall'],
    reward: 'q_rfd',
    coins: 50,
  },
  {
    id: 'm2_06', chapter: 2, path: 'main', category: 'Boss', priority: 10, chapterFinal: true,
    title: 'Zulrah',
    desc: 'Matar Zulrah até obter Tanzanite Fang e criar Toxic Blowpipe.',
    req: ['q_regicide', 'prayer_43', 'ranging_pot'],
    reward: 'i_blowpipe',
    coins: 80,
    reroll: 1,
  },

  // ── Side ──────────────────────────────────────────────────────────────────
  {
    id: 'm2_07', chapter: 2, path: 'side', category: 'Minigame', priority: 7,
    title: 'Tempoross',
    desc: 'Treinar Fishing até 62 via Tempoross.',
    req: ['fishing_35'],
    reward: 'a_tempoross',
    coins: 40,
  },
  {
    id: 'm2_08', chapter: 2, path: 'side', category: 'Skilling', priority: 7,
    title: 'Herblore',
    desc: 'Atingir Herblore 45 com Strength Potions.',
    req: ['q_druidic', 'farming_35'],
    reward: 'herblore_45',
    coins: 35,
  },
  {
    id: 'm2_09', chapter: 2, path: 'side', category: 'Skilling', priority: 7,
    title: 'Construction',
    desc: 'Atingir Construction 50 e construir POH básica.',
    req: [],
    reward: 'construction_50',
    coins: 40,
  },
  {
    id: 'm2_10', chapter: 2, path: 'side', category: 'Skilling', priority: 6,
    title: 'Agility',
    desc: 'Atingir Agility 50 no Gnome Stronghold Course.',
    req: [],
    reward: 'agility_50',
    coins: 35,
  },
  {
    id: 'm2_11', chapter: 2, path: 'side', category: 'Skilling', priority: 8,
    title: 'Magic',
    desc: 'Atingir Magic 55.',
    req: ['q_rune_mysteries'],
    reward: 'magic_55',
    coins: 35,
  },
  {
    id: 'm2_12', chapter: 2, path: 'side', category: 'Skilling', priority: 6,
    title: 'Fishing',
    desc: 'Pescar e cozinhar 200 Lobsters em Catherby.',
    req: ['fishing_40'],
    reward: 'lobster',
    coins: 30,
  },
  {
    id: 'm2_13', chapter: 2, path: 'side', category: 'Farming', priority: 7,
    title: 'Farming',
    desc: 'Atingir Farming 35 e iniciar herb patches diárias.',
    req: ['q_fairytale1', 'q_druidic'],
    reward: 'a_farming_runs',
    coins: 30,
  },
  {
    id: 'm2_14', chapter: 2, path: 'side', category: 'Skilling', priority: 5,
    title: 'Thieving',
    desc: 'Atingir Thieving 55 roubando Paladins em Ardougne.',
    req: ['thieving_38'],
    reward: 'thieving_55',
    coins: 35,
  },
  {
    id: 'm2_15', chapter: 2, path: 'side', category: 'Slayer', priority: 7,
    title: 'Slayer',
    desc: '50 tarefas de Slayer com Mazchna.',
    req: ['a_slayer', 'q_ds1'],
    reward: 'slayer_30',
    coins: 40,
  },
  {
    id: 'm2_16', chapter: 2, path: 'side', category: 'Boss', priority: 8,
    title: 'Barrows',
    desc: '15 runs de Barrows.',
    req: ['q_priest_peril', 'prayer_43', 'magic_55'],
    reward: 'a_barrows',
    coins: 60,
    huntUnlock: 'barrows',
  },
  {
    id: 'm2_17', chapter: 2, path: 'side', category: 'Skilling', priority: 5,
    title: 'Crafting',
    desc: 'Atingir Crafting 40 com leather items.',
    req: [],
    reward: 'crafting_40',
    coins: 25,
  },
  {
    id: 'm2_18', chapter: 2, path: 'side', category: 'Skilling', priority: 4,
    title: 'Woodcutting',
    desc: 'Atingir Woodcutting 60 cortando Willows e Yews.',
    req: [],
    reward: 'woodcut_60',
    coins: 25,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAPÍTULO 3 — CONSTRUINDO O PERSONAGEM
  // Meta: Abyssal Whip, Dragon Boots, Fire Cape, Dragon Defender
  // ══════════════════════════════════════════════════════════════════════════

  // ── Main ──────────────────────────────────────────────────────────────────
  {
    id: 'm3_01', chapter: 3, path: 'main', category: 'Quest', priority: 9,
    title: 'Monkey Madness II',
    desc: 'Completar Monkey Madness II (Slayer 69, Agility 70, Crafting 70, Hunter 70).',
    req: ['q_mm1', 'slayer_70', 'agility_70'],
    reward: 'q_mm2',
    coins: 80,
    reroll: 1,
  },
  {
    id: 'm3_02', chapter: 3, path: 'main', category: 'Slayer', priority: 9,
    title: 'Dragon Boots',
    desc: 'Slayer 60 e matar Spiritual Mages no GWD até dropar Dragon Boots.',
    req: ['q_mm1', 'prayer_43', 'slayer_55'],
    reward: 'i_d_boots',
    coins: 70,
    huntUnlock: 'spiritual_mages',
  },
  {
    id: 'm3_03', chapter: 3, path: 'main', category: 'Slayer', priority: 10,
    title: 'Abyssal Whip',
    desc: 'Slayer 85 e matar Abyssal Demons até obter Abyssal Whip.',
    req: ['slayer_70', 'i_d_boots'],
    reward: 'i_whip',
    coins: 90,
    reroll: 1,
    huntUnlock: 'abyssal_sire',
  },
  {
    id: 'm3_04', chapter: 3, path: 'main', category: 'Boss', priority: 9, chapterFinal: true,
    title: 'Fire Cape',
    desc: 'Completar Fight Caves e derrotar TzTok-Jad.',
    req: ['prayer_43', 'i_blowpipe'],
    reward: 'i_fire_cape',
    coins: 80,
    reroll: 1,
    huntUnlock: 'tztok_jad',
  },
  {
    id: 'm3_05', chapter: 3, path: 'main', category: 'Dungeon', priority: 8,
    title: 'Dragon Defender',
    desc: "100+ kills no Warrior's Guild até obter Dragon Defender.",
    req: ['q_mm1', 'attack_60', 'defence_60'],
    reward: 'i_d_defender',
    coins: 65,
  },
  {
    id: 'm3_06', chapter: 3, path: 'main', category: 'Boss', priority: 8,
    title: 'Barrows',
    desc: "50+ runs de Barrows até montar um set completo (Dharok's ou Guthan's).",
    req: ['a_barrows', 'prayer_43', 'magic_55', 'shark'],
    reward: 'barrows_armor',
    coins: 85,
  },

  // ── Side ──────────────────────────────────────────────────────────────────
  {
    id: 'm3_07', chapter: 3, path: 'side', category: 'Skilling', priority: 10,
    title: 'Prayer',
    desc: 'Atingir Prayer 70 via altar de POH ou Ectofuntus.',
    req: ['prayer_43', 'construction_50'],
    reward: 'prayer_70',
    coins: 60,
  },
  {
    id: 'm3_08', chapter: 3, path: 'side', category: 'Skilling', priority: 9,
    title: 'Herblore',
    desc: 'Atingir Herblore 63.',
    req: ['herblore_45', 'farming_35'],
    reward: 'herblore_63',
    coins: 55,
  },
  {
    id: 'm3_09', chapter: 3, path: 'side', category: 'Skilling', priority: 8,
    title: 'Construction',
    desc: 'Atingir Construction 70 e construir Marble Altar na POH.',
    req: ['construction_50'],
    reward: 'construction_70',
    coins: 55,
  },
  {
    id: 'm3_10', chapter: 3, path: 'side', category: 'Minigame', priority: 7,
    title: 'Nightmare Zone',
    desc: 'Desbloquear NMZ e acumular pontos para Overloads.',
    req: ['q_mm1', 'prayer_43'],
    reward: 'a_nmz',
    coins: 60,
  },
  {
    id: 'm3_11', chapter: 3, path: 'side', category: 'Skilling', priority: 7,
    title: 'Agility',
    desc: 'Atingir Agility 70 no Seers Village Rooftop Course.',
    req: ['agility_50'],
    reward: 'agility_70',
    coins: 50,
  },
  {
    id: 'm3_12', chapter: 3, path: 'side', category: 'Slayer', priority: 9,
    title: 'Slayer',
    desc: 'Atingir Slayer 70 com Nieve/Steve.',
    req: ['a_slayer', 'q_mm1', 'prayer_43'],
    reward: 'slayer_70',
    coins: 65,
  },
  {
    id: 'm3_13', chapter: 3, path: 'side', category: 'Boss', priority: 8,
    title: 'Zulrah',
    desc: '50 kills de Zulrah.',
    req: ['i_blowpipe', 'ranging_pot', 'shark', 'antidote'],
    reward: 'zulrah_access',
    coins: 70,
  },
  {
    id: 'm3_14', chapter: 3, path: 'side', category: 'Skilling', priority: 7,
    title: 'Fishing',
    desc: 'Atingir Fishing 76 no Resource Area — Dark Crabs.',
    req: ['a_tempoross'],
    reward: 'fishing_76',
    coins: 50,
  },
  {
    id: 'm3_15', chapter: 3, path: 'side', category: 'Minigame', priority: 6,
    title: 'Pest Control',
    desc: '850 pontos de Pest Control — Void Knight set completo.',
    req: ['q_mm1'],
    reward: 'void_ranged',
    coins: 65,
  },
  {
    id: 'm3_16', chapter: 3, path: 'side', category: 'Slayer', priority: 8,
    title: 'Trident of the Seas',
    desc: 'Slayer 75 e matar Cave Krakens até obter Trident of the Seas.',
    req: ['slayer_70', 'magic_55'],
    reward: 'trident',
    coins: 70,
    huntUnlock: 'cave_kraken',
  },
  {
    id: 'm3_17', chapter: 3, path: 'side', category: 'Skilling', priority: 7,
    title: 'Fishing',
    desc: 'Pescar e cozinhar 300 Sharks.',
    req: ['fishing_76'],
    reward: 'shark',
    coins: 50,
  },
  {
    id: 'm3_18', chapter: 3, path: 'side', category: 'Skilling', priority: 7,
    title: 'Herblore',
    desc: 'Atingir Herblore 55.',
    req: ['herblore_45'],
    reward: 'herblore_55',
    coins: 45,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAPÍTULO 4 — GWD & BOSS GRIND
  // Meta: Bandos, Armadyl, Dragon Warhammer, Occult, Rings
  // ══════════════════════════════════════════════════════════════════════════

  // ── Main ──────────────────────────────────────────────────────────────────
  {
    id: 'm4_01', chapter: 4, path: 'main', category: 'Quest', priority: 10,
    title: 'God Wars Dungeon',
    desc: 'Completar Troll Stronghold e Death Plateau.',
    req: ['prayer_70', 'q_mm1'],
    reward: 'a_gwd',
    coins: 70,
    huntUnlock: 'general_graardor',
  },
  {
    id: 'm4_02', chapter: 4, path: 'main', category: 'Boss', priority: 10,
    title: 'Bandos Chestplate',
    desc: 'Matar General Graardor até obter Bandos Chestplate.',
    req: ['a_gwd', 'prayer_70', 'super_pot', 'shark'],
    reward: 'i_bandos_chest',
    coins: 100,
    reroll: 1,
  },
  {
    id: 'm4_03', chapter: 4, path: 'main', category: 'Boss', priority: 9,
    title: 'Bandos Tassets',
    desc: 'Continuar General Graardor até obter Bandos Tassets.',
    req: ['i_bandos_chest', 'prayer_70'],
    reward: 'i_bandos_tassets',
    coins: 100,
  },
  {
    id: 'm4_04', chapter: 4, path: 'main', category: 'Boss', priority: 9,
    title: "Kree'arra",
    desc: "Matar Kree'arra até obter Armadyl Helm.",
    req: ['a_gwd', 'prayer_70', 'ranging_pot', 'shark', 'i_blowpipe'],
    reward: 'i_armadyl_helm',
    coins: 100,
    huntUnlock: 'kreearra',
  },
  {
    id: 'm4_05', chapter: 4, path: 'main', category: 'Boss', priority: 10, chapterFinal: true,
    title: 'Dragon Warhammer',
    desc: 'Matar Lizardman Shamans (Shayzien favour) até obter Dragon Warhammer.',
    req: ['i_bandos_tassets', 'prayer_70'],
    reward: 'i_dwh',
    coins: 120,
    reroll: 1,
  },

  // ── Side ──────────────────────────────────────────────────────────────────
  {
    id: 'm4_06', chapter: 4, path: 'side', category: 'Slayer', priority: 9,
    title: 'Occult Necklace',
    desc: 'Slayer 93 e matar Smoke Devils até obter Occult Necklace.',
    req: ['slayer_70', 'magic_55'],
    reward: 'occult',
    coins: 80,
    huntUnlock: 'thermonuclear',
  },
  {
    id: 'm4_07', chapter: 4, path: 'side', category: 'Boss', priority: 8,
    title: 'Cerberus',
    desc: 'Slayer 91 e matar Cerberus até obter crystal boots (Primordial, Pegasian ou Eternal).',
    req: ['slayer_70', 'prayer_70'],
    reward: 'cerberus_access',
    coins: 90,
    huntUnlock: 'cerberus',
  },
  {
    id: 'm4_08', chapter: 4, path: 'side', category: 'Boss', priority: 8,
    title: 'Berserker Ring',
    desc: 'Matar Dagannoth Rex até obter Berserker Ring.',
    req: ['prayer_70', 'super_pot', 'shark'],
    reward: 'berserker_ring',
    coins: 80,
    huntUnlock: 'dagannoth_rex',
  },
  {
    id: 'm4_09', chapter: 4, path: 'side', category: 'Boss', priority: 8,
    title: 'Archers Ring',
    desc: 'Matar Dagannoth Supreme até obter Archers Ring (i).',
    req: ['prayer_70', 'i_blowpipe'],
    reward: 'archers_ring',
    coins: 80,
    huntUnlock: 'dagannoth_supreme',
  },
  {
    id: 'm4_10', chapter: 4, path: 'side', category: 'Boss', priority: 7,
    title: 'Bandos Godsword',
    desc: 'Matar General Graardor até obter Bandos Godsword.',
    req: ['i_bandos_chest', 'prayer_70'],
    reward: 'bandos_gs',
    coins: 85,
  },
  {
    id: 'm4_11', chapter: 4, path: 'side', category: 'Boss', priority: 8,
    title: 'Armadyl Armour',
    desc: "Continuar Kree'arra até obter Armadyl Chestplate + Chainskirt.",
    req: ['i_armadyl_helm', 'prayer_70'],
    reward: 'armadyl_armor',
    coins: 100,
  },
  {
    id: 'm4_12', chapter: 4, path: 'side', category: 'Boss', priority: 7,
    title: 'Abyssal Sire',
    desc: 'Matar Abyssal Sire até obter Abyssal Dagger.',
    req: ['slayer_85', 'prayer_70'],
    reward: 'abyssal_sire',
    coins: 90,
  },
  {
    id: 'm4_13', chapter: 4, path: 'side', category: 'Skilling', priority: 8,
    title: 'Herblore',
    desc: 'Atingir Herblore 72.',
    req: ['herblore_63'],
    reward: 'herblore_72',
    coins: 65,
  },
  {
    id: 'm4_14', chapter: 4, path: 'side', category: 'Minigame', priority: 8,
    title: 'Nightmare Zone',
    desc: 'Acumular pontos de NMZ e comprar Overloads.',
    req: ['a_nmz', 'herblore_72'],
    reward: 'overload',
    coins: 70,
  },
  {
    id: 'm4_15', chapter: 4, path: 'side', category: 'Skilling', priority: 6,
    title: 'Runecrafting',
    desc: 'Atingir Runecraft 44 via ZMI Altar ou Abyss.',
    req: ['q_rune_mysteries', 'magic_55'],
    reward: 'runecraft_44',
    coins: 55,
  },
  {
    id: 'm4_16', chapter: 4, path: 'side', category: 'Boss', priority: 5,
    title: 'Sarachnis',
    desc: '50 kills de Sarachnis.',
    req: ['prayer_43', 'q_mm1'],
    reward: null,
    coins: 65,
    huntUnlock: 'sarachnis',
  },
  {
    id: 'm4_17', chapter: 4, path: 'side', category: 'Boss', priority: 5,
    title: 'King Black Dragon',
    desc: '50 kills de King Black Dragon.',
    req: ['prayer_43', 'ranged_60', 'i_blowpipe'],
    reward: null,
    coins: 65,
    huntUnlock: 'kbd',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAPÍTULO 5 — PRÉ-RAIDS
  // Meta: Vorkath, DHCB, SOTE, Gauntlet, gear de Raids
  // ══════════════════════════════════════════════════════════════════════════

  // ── Main ──────────────────────────────────────────────────────────────────
  {
    id: 'm5_01', chapter: 5, path: 'main', category: 'Quest', priority: 10,
    title: 'Dragon Slayer II',
    desc: 'Completar Dragon Slayer II (200 Quest Points + quests específicas).',
    req: ['q_mm2', 'prayer_70', 'i_bandos_tassets'],
    reward: 'q_ds2',
    coins: 120,
    reroll: 1,
    huntUnlock: 'vorkath',
  },
  {
    id: 'm5_02', chapter: 5, path: 'main', category: 'Boss', priority: 10,
    title: 'Vorkath',
    desc: '50+ kills de Vorkath.',
    req: ['q_ds2', 'i_blowpipe', 'prayer_70'],
    reward: 'vorkath_access',
    coins: 120,
  },
  {
    id: 'm5_03', chapter: 5, path: 'main', category: 'Boss', priority: 10,
    title: 'Dragon Hunter Crossbow',
    desc: 'Matar Vorkath até obter Dragon Hunter Crossbow.',
    req: ['vorkath_access'],
    reward: 'i_dhcb',
    coins: 150,
    reroll: 1,
  },
  {
    id: 'm5_04', chapter: 5, path: 'main', category: 'Quest', priority: 9,
    title: 'Song of the Elves',
    desc: 'Completar Song of the Elves.',
    req: ['q_mm2', 'prayer_70', 'q_regicide'],
    reward: 'q_sote',
    coins: 130,
    huntUnlock: 'zalcano',
  },
  {
    id: 'm5_05', chapter: 5, path: 'main', category: 'Minigame', priority: 9, chapterFinal: true,
    title: 'Corrupted Gauntlet',
    desc: 'Completar Corrupted Gauntlet até obter Crystal Armor ou Bow of Faerdhinen.',
    req: ['q_sote', 'prayer_70', 'i_dhcb'],
    reward: 'a_gauntlet',
    coins: 150,
    reroll: 1,
  },

  // ── Side ──────────────────────────────────────────────────────────────────
  {
    id: 'm5_06', chapter: 5, path: 'side', category: 'Boss', priority: 9,
    title: 'Demonic Gorillas',
    desc: '100 kills de Demonic Gorillas até obter Zenyte Shards.',
    req: ['q_mm2', 'prayer_70', 'i_blowpipe'],
    reward: 'zenyte_access',
    coins: 100,
  },
  {
    id: 'm5_07', chapter: 5, path: 'side', category: 'Quest', priority: 8,
    title: 'Desert Treasure I',
    desc: 'Completar Desert Treasure I.',
    req: ['q_mm1', 'magic_55', 'prayer_43', 'q_priest_peril'],
    reward: 'q_dt1',
    coins: 80,
  },
  {
    id: 'm5_08', chapter: 5, path: 'side', category: 'Boss', priority: 7,
    title: 'Phantom Muspah',
    desc: 'Matar Phantom Muspah até obter Venator Shard.',
    req: ['prayer_70', 'i_blowpipe'],
    reward: null,
    coins: 100,
    huntUnlock: 'phantom_muspah',
  },
  {
    id: 'm5_09', chapter: 5, path: 'side', category: 'Boss', priority: 7,
    title: 'Grotesque Guardians',
    desc: 'Slayer 75 e matar Grotesque Guardians até obter Black Tourmaline Core.',
    req: ['slayer_75', 'prayer_70'],
    reward: null,
    coins: 80,
    huntUnlock: 'grotesque_guardians',
  },
  {
    id: 'm5_10', chapter: 5, path: 'side', category: 'Skilling', priority: 9,
    title: 'Combat Training',
    desc: 'Atingir 90+ em Attack, Strength e Defence via NMZ.',
    req: ['prayer_70', 'a_nmz'],
    reward: 'combat_90',
    coins: 100,
  },
  {
    id: 'm5_11', chapter: 5, path: 'side', category: 'Skilling', priority: 8,
    title: 'Herblore',
    desc: 'Atingir Herblore 90.',
    req: ['herblore_72', 'a_farming_runs'],
    reward: 'herblore_90',
    coins: 90,
  },
  {
    id: 'm5_12', chapter: 5, path: 'side', category: 'Boss', priority: 6,
    title: "K'ril Tsutsaroth",
    desc: "Matar K'ril Tsutsaroth no GWD até obter Zamorak Godsword.",
    req: ['a_gwd', 'prayer_70', 'i_bandos_tassets'],
    reward: null,
    coins: 90,
    huntUnlock: 'k_ril_tsutsaroth',
  },
  {
    id: 'm5_13', chapter: 5, path: 'side', category: 'Combat Achievement', priority: 7,
    title: 'Combat Achievements',
    desc: 'Completar 20 Combat Achievements.',
    req: ['slayer_85', 'prayer_70'],
    reward: 'ca_medium',
    coins: 80,
  },
  {
    id: 'm5_14', chapter: 5, path: 'side', category: 'Slayer', priority: 8,
    title: 'Slayer Helm (i)',
    desc: 'Comprar Slayer Helm e imbuí-la via NMZ.',
    req: ['a_slayer', 'a_nmz', 'slayer_55'],
    reward: 'slayer_helm',
    coins: 75,
  },
  {
    id: 'm5_15', chapter: 5, path: 'side', category: 'Boss', priority: 7,
    title: 'Abyssal Sire',
    desc: '30 kills de Abyssal Sire.',
    req: ['slayer_85', 'prayer_70', 'super_pot'],
    reward: null,
    coins: 95,
  },
  {
    id: 'm5_16', chapter: 5, path: 'side', category: 'Slayer', priority: 7,
    title: 'Basilisk Knights',
    desc: 'Matar Basilisk Knights (Mirror Shield) até obter Basilisk Jaw.',
    req: ['slayer_70', 'prayer_70'],
    reward: null,
    coins: 85,
    huntUnlock: 'basilisk_knights',
  },
  {
    id: 'm5_17', chapter: 5, path: 'side', category: 'Skilling', priority: 7,
    title: 'Agility',
    desc: 'Atingir Agility 80 no Hallowed Sepulchre ou rooftops.',
    req: ['agility_70'],
    reward: 'agility_80',
    coins: 75,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAPÍTULO 6 — RAIDS
  // Meta: CoX, ToB, ToA, Twisted Bow, Scythe, Inferno
  // ══════════════════════════════════════════════════════════════════════════

  // ── Main ──────────────────────────────────────────────────────────────────
  {
    id: 'm6_01', chapter: 6, path: 'main', category: 'Boss', priority: 10,
    title: 'Chambers of Xeric',
    desc: 'Primeiro run de CoX (80+ combate, 78 Herblore, Trident + Blowpipe).',
    req: ['q_ds2', 'prayer_70', 'i_bandos_tassets', 'i_blowpipe', 'trident', 'herblore_72'],
    reward: 'a_cox',
    coins: 150,
    reroll: 2,
  },
  {
    id: 'm6_02', chapter: 6, path: 'main', category: 'Boss', priority: 10,
    title: 'Theatre of Blood',
    desc: 'Primeiro run de ToB.',
    req: ['a_cox', 'prayer_70', 'i_bandos_tassets', 'i_blowpipe'],
    reward: 'a_tob',
    coins: 180,
    reroll: 2,
  },
  {
    id: 'm6_03', chapter: 6, path: 'main', category: 'Boss', priority: 10,
    title: 'Tombs of Amascut',
    desc: 'Primeiro run de ToA — Invocation 0–50 para iniciantes.',
    req: ['a_cox', 'prayer_70', 'i_bandos_tassets'],
    reward: 'a_toa',
    coins: 160,
    reroll: 2,
  },
  {
    id: 'm6_04', chapter: 6, path: 'main', category: 'Boss', priority: 10,
    title: 'Twisted Bow',
    desc: 'Acumular runs de CoX em busca do Twisted Bow.',
    req: ['a_cox', 'prayer_70', 'i_dhcb'],
    reward: 'i_twisted_bow',
    coins: 200,
    reroll: 3,
  },
  {
    id: 'm6_05', chapter: 6, path: 'main', category: 'Boss', priority: 10,
    title: 'Scythe of Vitur',
    desc: 'Acumular runs de ToB em busca da Scythe of Vitur.',
    req: ['a_tob', 'prayer_70', 'i_bandos_tassets'],
    reward: 'i_scythe',
    coins: 200,
    reroll: 3,
  },

  // ── Side ──────────────────────────────────────────────────────────────────
  {
    id: 'm6_06', chapter: 6, path: 'side', category: 'Boss', priority: 10, chapterFinal: true,
    title: 'The Inferno',
    desc: 'Completar o Inferno e derrotar TzKal-Zuk.',
    req: ['i_fire_cape', 'prayer_70', 'a_nmz'],
    reward: 'i_infernal_cape',
    coins: 200,
    reroll: 3,
    huntUnlock: 'tzkalmzuk',
  },
  {
    id: 'm6_07', chapter: 6, path: 'side', category: 'Quest', priority: 9,
    title: 'Desert Treasure II',
    desc: 'Completar Desert Treasure II — The Fallen Empire.',
    req: ['q_dt1', 'prayer_70', 'i_bandos_tassets'],
    reward: 'q_dt2',
    coins: 150,
    reroll: 1,
    huntUnlock: 'vardorvis',
  },
  {
    id: 'm6_08', chapter: 6, path: 'side', category: 'Boss', priority: 9,
    title: 'DT2 Rings',
    desc: 'Matar os 4 bosses de DT2 em busca de Venator, Bellator, Magus ou Ultor Ring.',
    req: ['q_dt2'],
    reward: null,
    coins: 180,
    huntUnlock: 'the_leviathan',
  },
  {
    id: 'm6_09', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'Sanguinesti Staff',
    desc: 'Fazer ToB até obter Sanguinesti Staff.',
    req: ['a_tob', 'magic_75'],
    reward: 'sang_staff',
    coins: 180,
  },
  {
    id: 'm6_10', chapter: 6, path: 'side', category: 'Boss', priority: 7,
    title: 'Armadyl Crossbow',
    desc: "Matar Kree'arra até obter Armadyl Crossbow.",
    req: ['a_gwd', 'prayer_70', 'i_blowpipe'],
    reward: 'armadyl_cbow',
    coins: 120,
  },
  {
    id: 'm6_11', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'Ancestral Robes',
    desc: 'Fazer CoX até obter Ancestral Hat, Top e Bottom.',
    req: ['a_cox', 'magic_75'],
    reward: 'ancestral_armor',
    coins: 180,
  },
  {
    id: 'm6_12', chapter: 6, path: 'side', category: 'Slayer', priority: 8,
    title: 'Neitiznot Faceguard',
    desc: 'Matar Basilisk Knights até obter Basilisk Jaw e criar Neitiznot Faceguard.',
    req: ['slayer_70', 'prayer_70'],
    reward: null,
    coins: 130,
  },
  {
    id: 'm6_13', chapter: 6, path: 'side', category: 'Boss', priority: 7,
    title: 'Justiciar Armour',
    desc: 'Fazer ToB em busca de Justiciar Faceguard.',
    req: ['a_tob', 'prayer_70', 'i_bandos_tassets'],
    reward: null,
    coins: 180,
  },
  {
    id: 'm6_14', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'Duke Sucellus',
    desc: "Matar Duke Sucellus até obter Leviathan's Lure ou Magus Ring shards.",
    req: ['q_dt2'],
    reward: null,
    coins: 160,
    huntUnlock: 'duke_sucellus',
  },
  {
    id: 'm6_15', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'The Whisperer',
    desc: 'Matar The Whisperer até obter Ultor Ring shards ou Shadow Quartz.',
    req: ['q_dt2'],
    reward: null,
    coins: 160,
    huntUnlock: 'the_whisperer',
  },

  // ── Combat Achievement missions ──────────────────────────────────────────────
  // Sincronizados automaticamente via RuneProfile. ca_10/ca_50 etc. são adicionados
  // ao unlocked ao detectar o count. As missões abaixo aparecem quando o req é
  // atingido e dão coins + unlock para desbloquear a próxima.
  {
    id: 'ca_m1', chapter: 2, path: 'side', category: 'Combat Achievement', priority: 5,
    title: '10 Combat Achievements',
    desc: 'Completar 10 Combat Achievements (qualquer tier). Sincronizado via RuneProfile.',
    req: ['ca_10'],
    reward: null,
    coins: 40,
  },
  {
    id: 'ca_m2', chapter: 2, path: 'side', category: 'Combat Achievement', priority: 5,
    title: 'Easy tier completo (33 CAs)',
    desc: 'Completar todos os 33 Combat Achievements do tier Easy. Verificado via RuneProfile.',
    req: ['ca_easy_done'],
    reward: null,
    coins: 60,
  },
  {
    id: 'ca_m3', chapter: 3, path: 'side', category: 'Combat Achievement', priority: 5,
    title: '50 Combat Achievements',
    desc: 'Acumular 50 Combat Achievements no total. Sincronizado via RuneProfile.',
    req: ['ca_50'],
    reward: null,
    coins: 80,
  },
  {
    id: 'ca_m4', chapter: 3, path: 'side', category: 'Combat Achievement', priority: 5,
    title: 'Medium tier completo (41 CAs)',
    desc: 'Completar todos os 41 Combat Achievements do tier Medium.',
    req: ['ca_medium_done'],
    reward: null,
    coins: 100,
  },
  {
    id: 'ca_m5', chapter: 4, path: 'side', category: 'Combat Achievement', priority: 5,
    title: '100 Combat Achievements',
    desc: 'Acumular 100 Combat Achievements no total. Sincronizado via RuneProfile.',
    req: ['ca_100'],
    reward: null,
    coins: 120,
  },
  {
    id: 'ca_m6', chapter: 4, path: 'side', category: 'Combat Achievement', priority: 5,
    title: 'Hard tier completo (65 CAs)',
    desc: 'Completar todos os 65 Combat Achievements do tier Hard.',
    req: ['ca_hard_done'],
    reward: null,
    coins: 150,
  },

  // ── Achievement Diary missions ────────────────────────────────────────────────
  {
    id: 'diary_m1', chapter: 1, path: 'side', category: 'Diary', priority: 4,
    title: 'Lumbridge & Draynor Easy Diary',
    desc: 'Completar o Achievement Diary Easy de Lumbridge & Draynor. Requer Mining 10, Crafting 1.',
    req: ['mining_10'],
    reward: 'diary_lumbridge_easy',
    coins: 20,
  },
  {
    id: 'diary_m2', chapter: 1, path: 'side', category: 'Diary', priority: 4,
    title: 'Varrock Easy Diary',
    desc: 'Completar o Achievement Diary Easy de Varrock. Requer Attack 30, Mining 15, Magic 25.',
    req: ['attack_30', 'mining_15'],
    reward: 'diary_varrock_easy',
    coins: 20,
  },
  {
    id: 'diary_m3', chapter: 1, path: 'side', category: 'Diary', priority: 4,
    title: 'Falador Easy Diary',
    desc: 'Completar o Achievement Diary Easy de Falador. Requer Mining 10, Crafting 10.',
    req: ['mining_10', 'crafting_10'],
    reward: 'diary_falador_easy',
    coins: 20,
  },
  {
    id: 'diary_m4', chapter: 1, path: 'side', category: 'Diary', priority: 4,
    title: 'Karamja Easy Diary',
    desc: 'Completar o Achievement Diary Easy de Karamja. Requer Fishing 35.',
    req: ['fishing_35'],
    reward: 'diary_karamja_easy',
    coins: 20,
  },
  {
    id: 'diary_m5', chapter: 2, path: 'side', category: 'Diary', priority: 4,
    title: 'Ardougne Easy Diary',
    desc: 'Completar o Achievement Diary Easy de Ardougne. Requer Thieving 38 e acesso a Ardougne (Biohazard).',
    req: ['q_biohazard', 'thieving_38'],
    reward: 'diary_ardougne_easy',
    coins: 25,
  },
  {
    id: 'diary_m6', chapter: 2, path: 'side', category: 'Diary', priority: 4,
    title: 'Morytania Easy Diary',
    desc: 'Completar o Achievement Diary Easy de Morytania. Requer Priest in Peril + Slayer 15.',
    req: ['q_priest_peril', 'slayer_15'],
    reward: 'diary_morytania_easy',
    coins: 25,
  },
  {
    id: 'diary_m7', chapter: 2, path: 'side', category: 'Diary', priority: 4,
    title: 'Lumbridge & Draynor Medium Diary',
    desc: 'Completar o Achievement Diary Medium de Lumbridge & Draynor. Requer Farming 26, Crafting 36.',
    req: ['diary_lumbridge_easy', 'farming_26', 'crafting_36'],
    reward: 'diary_lumbridge_medium',
    coins: 40,
  },
  {
    id: 'diary_m8', chapter: 2, path: 'side', category: 'Diary', priority: 4,
    title: 'Varrock Medium Diary',
    desc: 'Completar o Achievement Diary Medium de Varrock. Requer Mining 40, Smithing 40.',
    req: ['diary_varrock_easy', 'mining_40', 'smithing_40'],
    reward: 'diary_varrock_medium',
    coins: 40,
  },
  {
    id: 'diary_m9', chapter: 3, path: 'side', category: 'Diary', priority: 4,
    title: 'Ardougne Medium Diary',
    desc: 'Completar o Achievement Diary Medium de Ardougne. Requer Fishing 56, Thieving 56.',
    req: ['diary_ardougne_easy', 'fishing_56', 'thieving_56'],
    reward: 'diary_ardougne_medium',
    coins: 60,
  },
  {
    id: 'diary_m10', chapter: 3, path: 'side', category: 'Diary', priority: 4,
    title: 'Morytania Medium Diary',
    desc: 'Completar o Achievement Diary Medium de Morytania. Requer Crafting 53, Slayer 50.',
    req: ['diary_morytania_easy', 'crafting_53', 'slayer_50'],
    reward: 'diary_morytania_medium',
    coins: 60,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // VARLAMORE & SAILING — Capítulo 4 (mid-game)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'mv_01', chapter: 4, path: 'main', category: 'Quest', priority: 8,
    title: 'Children of the Sun',
    desc: 'Completar Children of the Sun — acesso a Varlamore e todo o conteúdo mid-game da região.',
    req: [],
    reward: 'q_children_sun',
    coins: 60,
  },
  {
    id: 'mv_02', chapter: 4, path: 'side', category: 'Skilling', priority: 6,
    title: 'Sailing 47 — Rosewood Blowpipe',
    desc: 'Alcançar Sailing 47 e craftar o Rosewood Blowpipe — alternativa ao Toxic Blowpipe que não consome Zulrah scales.',
    req: [],
    reward: 'sailing_47',
    coins: 50,
  },
  {
    id: 'mv_03', chapter: 4, path: 'side', category: 'Skilling', priority: 5,
    title: "Sailor's Amulet",
    desc: "Obter o Sailor's Amulet via Sailing — um dos amulets de utilidade mais fáceis de conseguir, com teleportes convenientes desde o início.",
    req: [],
    reward: null,
    coins: 30,
  },
  {
    id: 'mv_04', chapter: 4, path: 'side', category: 'Minigame', priority: 6,
    title: 'Mixology — Alchemist\'s Amulet',
    desc: "Completar a atividade Mixology em Varlamore e obter o Alchemist's Amulet (15% de chance de salvar dose de poção). A atividade também oferece outros itens úteis para Herblore.",
    req: ['q_children_sun'],
    reward: 'a_mixology',
    coins: 50,
  },
  {
    id: 'mv_05', chapter: 4, path: 'side', category: 'Skilling', priority: 5,
    title: 'Rainbow Crab Trapping',
    desc: 'Coletar crab paste via Rainbow Crabs (Sailing) — ingrediente para Saradomin brews sem o grind tradicional de farming.',
    req: ['sailing_47'],
    reward: null,
    coins: 30,
  },
  {
    id: 'mv_06', chapter: 4, path: 'side', category: 'Skilling', priority: 6,
    title: 'Sunlight Hunter\'s Crossbow',
    desc: 'Alcançar 72 Hunter e caçar Sun-Tipped Antelopes em Varlamore para craftar a Sunlight Hunter\'s Crossbow — ranged weapon mid-game com Sunlight Bolts.',
    req: ['q_children_sun', 'hunter_72', 'ranged_50'],
    reward: null,
    coins: 60,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // VARLAMORE & SAILING — Capítulo 5 (pré-raids)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'mv_07', chapter: 5, path: 'main', category: 'Quest', priority: 7,
    title: 'Shadows of Custodia',
    desc: 'Completar Shadows of Custodia — continua a história de Varlamore e desbloqueia conteúdo adicional da região.',
    req: ['q_children_sun'],
    reward: 'q_shadows_custodia',
    coins: 80,
  },
  {
    id: 'mv_08', chapter: 5, path: 'main', category: 'Boss', priority: 9,
    title: 'Perilous Moons — Primeiro Kill',
    desc: 'Matar os 3 bosses do Perilous Moons pela 1ª vez (Blood Moon, Eclipse Moon, Blue Moon) em Tlati Rainforest.',
    req: ['q_children_sun'],
    reward: 'a_perilous_moons',
    coins: 80,
  },
  {
    id: 'mv_09', chapter: 5, path: 'side', category: 'Boss', priority: 8,
    title: 'Blood Moon Set (melee)',
    desc: "Farmar Perilous Moons até obter Blood Moon Helm, Chestplate e Tassets — set melee mid-game supply-free. Stopgap entre Barrows e Bandos.",
    req: ['a_perilous_moons', 'defence_70'],
    reward: null,
    coins: 100,
  },
  {
    id: 'mv_10', chapter: 5, path: 'side', category: 'Boss', priority: 8,
    title: 'Eclipse Moon Set (ranged)',
    desc: "Farmar Perilous Moons até obter Eclipse Moon Helm, Body e Legs — set ranged mid-game supply-free. Entre Karil's e Armadyl.",
    req: ['a_perilous_moons', 'ranged_60', 'defence_60'],
    reward: null,
    coins: 100,
  },
  {
    id: 'mv_11', chapter: 5, path: 'side', category: 'Boss', priority: 8,
    title: 'Blue Moon Set (mage)',
    desc: "Farmar Perilous Moons até obter Blue Moon Helm, Spell Robe e Legs — set mage mid-game supply-free. Entre Ahrim's e Ancestral.",
    req: ['a_perilous_moons', 'magic_60', 'defence_60'],
    reward: null,
    coins: 100,
  },
  {
    id: 'mv_12', chapter: 5, path: 'side', category: 'Skilling', priority: 6,
    title: 'Sailing 60 — Charred Dungeon',
    desc: 'Alcançar Sailing 60 e desbloquear o Charred Dungeon com Tower Nechryaels em multi-combat — barrageáveis para XP eficiente.',
    req: ['sailing_47'],
    reward: 'sailing_60',
    coins: 70,
  },
  {
    id: 'mv_13', chapter: 5, path: 'side', category: 'Skilling', priority: 6,
    title: 'Sailing 76 — Bloodvelds',
    desc: "Alcançar Sailing 76 e desbloquear Bloodvelds no Buccs' Lab — local conveniente para task de Slayer.",
    req: ['sailing_60'],
    reward: 'sailing_76',
    coins: 80,
  },
  {
    id: 'mv_14', chapter: 5, path: 'side', category: 'Boss', priority: 7,
    title: 'Gryphon — Arma de Stab',
    desc: 'Farmar Gryphons (Sailing) para obter a arma de stab — excelente gap-filler para contas sem Zamorakian hasta.',
    req: ['q_children_sun'],
    reward: null,
    coins: 70,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // VARLAMORE & SAILING — Capítulo 6 (endgame)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'mv_15', chapter: 6, path: 'main', category: 'Quest', priority: 8,
    title: 'The Final Dawn',
    desc: 'Completar The Final Dawn — quest final da cadeia de Varlamore. Desbloqueia conteúdo endgame da região.',
    req: ['q_shadows_custodia'],
    reward: 'q_final_dawn',
    coins: 100,
    reroll: 1,
  },
  {
    id: 'mv_16', chapter: 6, path: 'main', category: 'Boss', priority: 10, chapterFinal: true,
    title: 'Colosseum — Sol Heredit',
    desc: 'Completar o Colosseum e derrotar Sol Heredit — desafio de dificuldade máxima de Varlamore, comparável ao Inferno.',
    req: ['q_children_sun', 'prayer_70'],
    reward: 'a_colosseum',
    coins: 200,
    reroll: 3,
  },
  {
    id: 'mv_17', chapter: 6, path: 'side', category: 'Boss', priority: 9,
    title: 'Sunfire Fanatic Armour',
    desc: 'Obter o Sunfire Fanatic Armour completo via Colosseum — BIS situacional para conteúdo que exige Prayer sustentado.',
    req: ['a_colosseum'],
    reward: null,
    coins: 150,
  },
  {
    id: 'mv_18', chapter: 6, path: 'side', category: 'Skilling', priority: 7,
    title: 'Sailing 87 — Frost Dragons',
    desc: 'Alcançar Sailing 87 e desbloquear Frost Dragons — um dos melhores métodos para Ironman farmar Draconic Bones e Draconic Visage.',
    req: ['sailing_76'],
    reward: 'sailing_87',
    coins: 100,
  },
  {
    id: 'mv_18b', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'Amoxliatl — Primeiro Kill',
    desc: 'Matar Amoxliatl pela 1ª vez — boss endgame de Varlamore (fraco a crush). Dropa Pendant of Ates e Glacial Temotli.',
    req: ['q_final_dawn'],
    reward: 'a_amoxliatl',
    coins: 120,
  },
  {
    id: 'mv_19', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'Avernic Treads — Mokha',
    desc: 'Matar Mokha até obter Avernic Treads — BIS boots para todos os estilos de combate. Supera Primordial, Pegasian e Eternal.',
    req: ['q_final_dawn'],
    reward: null,
    coins: 150,
  },
  {
    id: 'mv_20', chapter: 6, path: 'side', category: 'Boss', priority: 8,
    title: 'Confliction Gauntlets',
    desc: 'Obter Confliction Gauntlets via Delve Mokha — BIS luvas late-game para todos os estilos de combate.',
    req: ['q_final_dawn'],
    reward: null,
    coins: 150,
  },
  {
    id: 'mv_21', chapter: 6, path: 'side', category: 'Boss', priority: 7,
    title: 'Eye of Ayak',
    desc: 'Obter Eye of Ayak via Delve Mokha — arma mágica 3-tick, mid-tier entre Trident e Sanguinesti Staff.',
    req: ['q_final_dawn', 'magic_75'],
    reward: null,
    coins: 130,
  },
]

export const CHAPTER_META = {
  1: { label: 'Primeiros Passos',        color: '#3B6D11', bg: '#EAF3DE', border: '#97C459' },
  2: { label: 'Fundação do Ironman',     color: '#854F0B', bg: '#FAEEDA', border: '#EF9F27' },
  3: { label: 'Construindo o Personagem',color: '#7A1F1F', bg: '#FAECE7', border: '#D85A30' },
  4: { label: 'GWD & Boss Grind',        color: '#2a1a6e', bg: '#ede8ff', border: '#8B6BD4' },
  5: { label: 'Pré-Raids',              color: '#0a4a4a', bg: '#e0f5f5', border: '#2ca8a8' },
  6: { label: 'Raids',                  color: '#5a1a00', bg: '#fff0e6', border: '#c8682a' },
}

export function checkReq(req, unlocked, realLevels) {
  if (unlocked.has(req)) return true
  const match = req.match(/^([a-z]+)_(\d+)$/)
  if (!match) return false
  const skill = match[1].charAt(0).toUpperCase() + match[1].slice(1)
  return (realLevels?.[skill] ?? 0) >= parseInt(match[2], 10)
}

export function drawOptions(unlocked, completed, realLevels) {
  const rnd = arr => arr.length ? arr[Math.floor(Math.random() * arr.length)] : null

  const pool = MISSIONS.filter(m =>
    !completed.has(m.id) &&
    (m.req ?? []).every(r => checkReq(r, unlocked, realLevels))
  )

  if (!pool.length) return []

  // Current chapter = lowest chapter that still has main missions available
  const mainPool = pool.filter(m => m.path === 'main')
  const currentChapter = mainPool.length
    ? Math.min(...mainPool.map(m => m.chapter))
    : Math.min(...pool.map(m => m.chapter))

  const chapterMain = pool.filter(m => m.path === 'main' && m.chapter === currentChapter)
  const chapterSide = pool.filter(m => m.path === 'side' && m.chapter === currentChapter)

  // card1: highest priority main mission
  const sortedMain = [...chapterMain].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
  const card1 = sortedMain[0] ?? null

  // card2: random side from current chapter
  const card2 = rnd(chapterSide)

  // card3: anything else in pool (any chapter, different from card1/card2)
  const used = new Set([card1?.id, card2?.id].filter(Boolean))
  const card3 = rnd(pool.filter(m => !used.has(m.id)))

  return [card1, card2, card3].filter(Boolean)
}

export function getChapterProgress(completed) {
  const result = {}
  for (let ch = 1; ch <= 6; ch++) {
    const mainMissions = MISSIONS.filter(m => m.chapter === ch && m.path === 'main')
    const doneMain = mainMissions.filter(m => completed.has(m.id))
    result[ch] = { total: mainMissions.length, done: doneMain.length }
  }
  return result
}
