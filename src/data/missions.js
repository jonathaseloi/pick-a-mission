// ─────────────────────────────────────────────────────────────────────────────
// MISSIONS — Ironman padrão, early → raids prep
//
// priority: número de 1–10 usado para destacar a carta "recomendada"
//           seguindo o caminho eficiente de ironman (guia Oziris/Settled)
//           10 = absolutamente crítico no caminho, 1 = side content
//
// diff:   "easy" | "normal" | "hard"
// type:   Skilling | Quest | Boss | Dungeon | Diary | Grind | Slayer
//         | Combat Achievement | Minigame | Farming
// req:    IDs de UNLOCKS necessários para a missão aparecer no sorteio
// reward: ID de um UNLOCK desbloqueado ao completar
// ─────────────────────────────────────────────────────────────────────────────

export const MISSIONS = [

  // ════════════════════════════════════════════════════════════════════════════
  // EARLY GAME — primeiros passos
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'm01', title: 'Primeiro Passo', diff: 'easy', type: 'Skilling', priority: 3,
    desc: 'Roubar um Homem (Man) 10 vezes em Lumbridge.',
    req: [],
    reward: 'bronze_sword',
    flavor: 'Um ferreiro se impressiona com sua coragem e te entrega uma espada.',
  },
  {
    id: 'm02', title: 'Corpo Robusto', diff: 'easy', type: 'Skilling', priority: 4,
    desc: 'Atingir nível 10 de Defence.',
    req: [],
    reward: 'leather_armor',
    flavor: 'Com treino suficiente você aprende a se proteger com couro.',
  },
  {
    id: 'm03', title: 'Olho de Arqueiro', diff: 'easy', type: 'Skilling', priority: 3,
    desc: 'Atingir nível 5 de Ranged.',
    req: [],
    reward: 'shortbow',
    flavor: 'Você acha um arco curto abandonado na floresta.',
  },
  {
    id: 'm04', title: 'Das Águas', diff: 'easy', type: 'Skilling', priority: 5,
    desc: 'Pescar e cozinhar 20 Shrimps.',
    req: [],
    reward: 'fishing_40',
    flavor: 'Um pescador veterano te ensina técnicas avançadas.',
  },
  {
    id: 'm05', title: 'Serviço à Coroa', diff: 'easy', type: 'Quest', priority: 6,
    desc: "Completar a quest Cook's Assistant.",
    req: [],
    reward: 'attack_30',
    flavor: 'O Duque de Lumbridge te treina pessoalmente como recompensa.',
  },
  {
    id: 'm06', title: 'Forja Simples', diff: 'easy', type: 'Quest', priority: 5,
    desc: "Completar a quest Doric's Quest.",
    req: [],
    reward: 'mining_60',
    flavor: 'Doric te ensina o básico da mineração.',
  },
  {
    id: 'm07', title: 'Flecha Reta', diff: 'easy', type: 'Skilling', priority: 3,
    desc: 'Atingir nível 20 de Ranged.',
    req: ['shortbow'],
    reward: 'oak_shortbow',
    flavor: 'Você talha seu próprio arco de carvalho.',
  },
  {
    id: 'm08', title: 'Corredor de Lumbridge', diff: 'easy', type: 'Quest', priority: 7,
    desc: 'Completar as quests Sheep Shearer e Rune Mysteries.',
    req: [],
    reward: 'magic_teleport',
    flavor: 'O Arquimago de Lumbridge te ensina a teletransportar.',
  },
  {
    id: 'm09', title: 'Acólito da Chama', diff: 'easy', type: 'Skilling', priority: 8,
    desc: 'Atingir nível 50 de Firemaking.',
    req: [],
    reward: 'firemaking_50',
    flavor: 'As chamas obedecem seus comandos — o Wintertodt treme.',
  },
  {
    id: 'm10', title: 'Ladrão Habilidoso', diff: 'easy', type: 'Skilling', priority: 5,
    desc: 'Roubar Mestres do Pão (Master Farmers) até nível 38 de Thieving.',
    req: [],
    reward: 'farming_35',
    flavor: 'As sementes roubadas ensinam os segredos do cultivo.',
  },
  {
    id: 'm11', title: 'Pequeno Fazendeiro', diff: 'easy', type: 'Farming', priority: 7,
    desc: 'Plantar e colher 10 herb patches com qualquer erva.',
    req: ['farming_35'],
    reward: 'birdhouse',
    flavor: 'A terra te recompensa — você descobre as Bird House runs.',
  },
  {
    id: 'm12', title: 'Lenhador Iniciante', diff: 'easy', type: 'Skilling', priority: 4,
    desc: 'Cortar 50 troncos de Willow.',
    req: [],
    reward: 'woodcut_60',
    flavor: 'Suas mãos ficam calejadas, mas o machado obedece.',
  },

  // ── Normal — early ────────────────────────────────────────────────────────

  {
    id: 'm13', title: 'Mestre do Frio', diff: 'normal', type: 'Minigame', priority: 9,
    desc: 'Completar 10 runs de Wintertodt e atingir 60 de Firemaking.',
    req: ['firemaking_50'],
    reward: 'firemaking_60',
    flavor: 'O espírito do frio é domado — sua fogueira nunca mais apaga.',
  },
  {
    id: 'm14', title: 'Guerreiro de Ferro', diff: 'normal', type: 'Dungeon', priority: 5,
    desc: 'Completar o Stronghold of Security (todos os andares).',
    req: ['bronze_sword', 'leather_armor'],
    reward: 'iron_sword',
    flavor: 'Nas profundezas do Stronghold você acha uma espada de ferro.',
  },
  {
    id: 'm15', title: 'Armadura Sólida', diff: 'normal', type: 'Quest', priority: 6,
    desc: "Atingir nível 20 de Defence e completar Knight's Sword.",
    req: ['leather_armor'],
    reward: 'iron_armor',
    flavor: 'Sir Vyvin te recompensa com armadura de ferro.',
  },
  {
    id: 'm16', title: 'Pescador de Lagostas', diff: 'normal', type: 'Skilling', priority: 7,
    desc: 'Pescar e cozinhar 100 Lobsters em Catherby.',
    req: ['fishing_40'],
    reward: 'lobster',
    flavor: 'Sua técnica de pesca evolui — lagostas viram seu combustível.',
  },
  {
    id: 'm17', title: 'Bênção Divina', diff: 'normal', type: 'Quest', priority: 8,
    desc: 'Atingir nível 37 de Prayer e completar Priest in Peril.',
    req: ['iron_armor'],
    reward: 'prayer_pot',
    flavor: 'O Padre Drezel te ensina a preparar poções de oração.',
  },
  {
    id: 'm18', title: 'Alquimista', diff: 'normal', type: 'Skilling', priority: 8,
    desc: 'Atingir nível 55 de Magic treinando com Fire Strike.',
    req: ['magic_teleport'],
    reward: 'alch',
    flavor: 'Você descobre o segredo de transformar itens em ouro.',
  },
  {
    id: 'm19', title: 'Pescador das Tempestades', diff: 'normal', type: 'Minigame', priority: 9,
    desc: 'Atingir nível 62 de Fishing via Tempoross.',
    req: ['fishing_40'],
    reward: 'fishing_62',
    flavor: 'O Tempoross é domado — você emerge como mestre das águas.',
  },
  {
    id: 'm20', title: 'Mãos Ágeis', diff: 'normal', type: 'Skilling', priority: 7,
    desc: 'Atingir nível 50 de Agility no Gnome Stronghold.',
    req: [],
    reward: 'agility_50',
    flavor: 'Seu corpo fica mais leve — energia nunca mais é problema.',
  },
  {
    id: 'm21', title: 'Artesão', diff: 'normal', type: 'Skilling', priority: 6,
    desc: 'Atingir nível 40 de Crafting fazendo leather items.',
    req: [],
    reward: 'crafting_40',
    flavor: 'Suas mãos aprendem a moldar couro e metal.',
  },
  {
    id: 'm22', title: 'Aprendiz de Herblore', diff: 'normal', type: 'Quest', priority: 8,
    desc: 'Completar Druidic Ritual e atingir 45 de Herblore.',
    req: [],
    reward: 'herblore_45',
    flavor: 'Os druidas te ensinam os segredos das ervas sagradas.',
  },

  // ── Hard — early ──────────────────────────────────────────────────────────

  {
    id: 'm23', title: 'Gigante das Cavernas', diff: 'hard', type: 'Boss', priority: 6,
    desc: 'Matar Obor 3 vezes (Hill Giant Boss).',
    req: ['iron_sword', 'iron_armor', 'lobster'],
    reward: 'giant_club',
    flavor: 'Você derrota o Rei dos Gigantes e saqueia seu clube.',
  },
  {
    id: 'm24', title: 'Sangue de Dragão', diff: 'hard', type: 'Quest', priority: 8,
    desc: 'Completar Dragon Slayer I.',
    req: ['iron_sword', 'iron_armor', 'lobster'],
    reward: 'mithril_armor',
    flavor: 'As escamas de Elvarg se transformam numa armadura de mithril.',
  },
  {
    id: 'm25', title: 'Caçador Iniciante', diff: 'hard', type: 'Slayer', priority: 9,
    desc: 'Completar 50 tarefas de Slayer com Turael/Spria.',
    req: ['iron_sword', 'iron_armor', 'lobster'],
    reward: 'slayer_access',
    flavor: 'Turael te reconhece como um verdadeiro caçador de monstros.',
  },
  {
    id: 'm26', title: 'Fé Inabalável', diff: 'hard', type: 'Quest', priority: 9,
    desc: 'Atingir 43 de Prayer e completar Priest in Peril + Mountain Daughter.',
    req: ['prayer_pot', 'iron_armor'],
    reward: 'prayer_43',
    flavor: 'Os deuses te concedem proteção contra as lâminas inimigas.',
  },
  {
    id: 'm27', title: 'Descendente do Macaco', diff: 'hard', type: 'Quest', priority: 8,
    desc: 'Completar Monkey Madness I.',
    req: ['mithril_armor', 'prayer_43', 'lobster'],
    reward: 'd_scimitar',
    flavor: 'Os gnomos te concedem uma lâmina de dragão como recompensa.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MID GAME — construindo o personagem
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'm28', title: 'Runa nas Mãos', diff: 'easy', type: 'Quest', priority: 7,
    desc: 'Completar Dragon Slayer II (pré-req: DS1, MM2, Legends Quest).',
    req: ['d_scimitar', 'mithril_armor', 'prayer_43'],
    reward: 'rune_armor',
    flavor: 'Galvek cai — e com ele, a armadura de runa se torna sua.',
  },
  {
    id: 'm29', title: 'Pesca Profunda', diff: 'easy', type: 'Skilling', priority: 6,
    desc: 'Atingir nível 76 de Fishing para pescar Dark Crabs.',
    req: ['fishing_62'],
    reward: 'fishing_76',
    flavor: 'Nas águas mais profundas vivem os melhores alimentos.',
  },
  {
    id: 'm30', title: 'Carapaça das Trevas', diff: 'easy', type: 'Skilling', priority: 6,
    desc: 'Pescar e cozinhar 100 Dark Crabs no Resource Area.',
    req: ['fishing_76'],
    reward: 'dark_crab',
    flavor: 'O alimento das trevas fortalece seu corpo além do normal.',
  },
  {
    id: 'm31', title: 'Ervas do Caos', diff: 'easy', type: 'Skilling', priority: 8,
    desc: 'Atingir 55 de Herblore para fazer Super Restore e Anti-veneno.',
    req: ['herblore_45', 'farming_35'],
    reward: 'herblore_55',
    flavor: 'Suas poções ficam cada vez mais potentes.',
  },
  {
    id: 'm32', title: 'Construtor do Lar', diff: 'easy', type: 'Skilling', priority: 7,
    desc: 'Atingir 50 de Construction e construir uma POH básica.',
    req: [],
    reward: 'construction_50',
    flavor: 'Sua casa começa a tomar forma — o banco de runes está próximo.',
  },
  {
    id: 'm33', title: 'Mestre Ladrão', diff: 'easy', type: 'Skilling', priority: 6,
    desc: 'Atingir 55 de Thieving roubando Paladins em Ardougne.',
    req: [],
    reward: 'thieving_55',
    flavor: 'Suas mãos se tornam fantasmas — ninguém percebe o furto.',
  },
  {
    id: 'm34', title: 'Senhor da Runas', diff: 'easy', type: 'Skilling', priority: 7,
    desc: 'Atingir 44 de Runecraft fazendo Nature Runes.',
    req: ['magic_55'],
    reward: 'runecraft_44',
    flavor: 'Você aprende a criar as runas mais valiosas do mundo.',
  },

  // ── Normal — mid ──────────────────────────────────────────────────────────

  {
    id: 'm35', title: 'Veneno da Serpente', diff: 'normal', type: 'Boss', priority: 9,
    desc: 'Completar Regicide e fazer 10 kills de Zulrah.',
    req: ['d_scimitar', 'mithril_armor', 'prayer_43', 'prayer_pot', 'lobster'],
    reward: 'zulrah_access',
    flavor: 'A serpente sagrada cai — e seus drops mudam seu jogo.',
  },
  {
    id: 'm36', title: 'Maestro do Combate', diff: 'normal', type: 'Minigame', priority: 8,
    desc: 'Atingir 70 de Strength e completar o Fighter Torso no Barbarian Assault.',
    req: ['d_scimitar', 'mithril_armor', 'prayer_43'],
    reward: 'fighter_torso',
    flavor: 'A tribo bárbara reconhece seu valor e te entrega o torso.',
  },
  {
    id: 'm37', title: 'Pesadelo da Zona', diff: 'normal', type: 'Minigame', priority: 8,
    desc: 'Completar quests suficientes e fazer 5h de NMZ para Overloads.',
    req: ['rune_scimitar', 'prayer_43', 'prayer_pot'],
    reward: 'nmz_access',
    flavor: 'O Nightmare Zone te absorve — e você sai muito mais forte.',
  },
  {
    id: 'm38', title: 'Cavaleiro Ágil', diff: 'normal', type: 'Skilling', priority: 7,
    desc: 'Atingir 70 de Agility no Seers Village Rooftop.',
    req: ['agility_50'],
    reward: 'agility_70',
    flavor: 'Você percorre os telhados como uma sombra.',
  },
  {
    id: 'm39', title: 'Boticário de Guerra', diff: 'normal', type: 'Skilling', priority: 8,
    desc: 'Atingir 63 de Herblore e fazer Super Combat Potions.',
    req: ['herblore_55', 'farming_50'],
    reward: 'super_pot',
    flavor: 'A poção de combate suprema flui em suas mãos.',
  },
  {
    id: 'm40', title: 'Fazendeiro Dedicado', diff: 'normal', type: 'Farming', priority: 8,
    desc: 'Atingir 50 de Farming e começar tree runs diárias.',
    req: ['farming_35', 'birdhouse'],
    reward: 'farming_50',
    flavor: 'Suas plantações cobrem Gielinor — os recursos nunca faltam.',
  },
  {
    id: 'm41', title: 'Flecheiro das Florestas', diff: 'normal', type: 'Skilling', priority: 6,
    desc: 'Atingir 65 de Fletching fazendo Maple Longbows.',
    req: ['fletching_50', 'woodcut_60'],
    reward: 'fletching_65',
    flavor: 'Seus arcos se tornam ferramentas de alta alchemy.',
  },
  {
    id: 'm42', title: 'Proteção Sagrada', diff: 'normal', type: 'Skilling', priority: 9,
    desc: 'Atingir 70 de Prayer via ossários ou altar de POH.',
    req: ['prayer_43', 'construction_50'],
    reward: 'prayer_70',
    flavor: 'Piety flui por você — ataque, força e defesa são amplificados.',
  },

  // ── Hard — mid ────────────────────────────────────────────────────────────

  {
    id: 'm43', title: 'Guerreiro do Barrows', diff: 'hard', type: 'Boss', priority: 8,
    desc: 'Completar 20 runs de Barrows e obter pelo menos 1 item.',
    req: ['d_scimitar', 'mithril_armor', 'prayer_43', 'prayer_pot', 'shark'],
    reward: 'barrows_access',
    flavor: 'Os irmãos Barrows caem — e seu espólio equipa você para batalhas maiores.',
  },
  {
    id: 'm44', title: 'Boots do Dragão', diff: 'hard', type: 'Slayer', priority: 9,
    desc: 'Atingir 60 de Slayer e matar Spiritual Warriors até dropar Dragon Boots.',
    req: ['slayer_access', 'd_scimitar', 'mithril_armor', 'prayer_43'],
    reward: 'dragon_boots',
    flavor: 'As botas de dragão aumentam seu Strength além do limite anterior.',
  },
  {
    id: 'm45', title: 'Senhor das Cobras', diff: 'hard', type: 'Slayer', priority: 8,
    desc: 'Atingir 70 de Slayer e fazer 50 tasks com Nieve/Steve.',
    req: ['slayer_access', 'rune_scimitar', 'prayer_43', 'lobster'],
    reward: 'slayer_70',
    flavor: 'Nieve te olha com respeito — você é um caçador de verdade.',
  },
  {
    id: 'm46', title: 'Herdeiro do Dragão', diff: 'hard', type: 'Quest', priority: 9,
    desc: 'Completar Monkey Madness II.',
    req: ['d_scimitar', 'rune_armor', 'prayer_43', 'prayer_pot', 'shark'],
    reward: 'magic_75',
    flavor: 'O General Kruk cai — e o poder dos macacos flui por você.',
  },
  {
    id: 'm47', title: 'Tridente das Profundezas', diff: 'hard', type: 'Slayer', priority: 9,
    desc: 'Atingir 75 de Slayer e matar Krakens até obter o Trident of the Seas.',
    req: ['slayer_70', 'magic_55', 'rune_armor', 'prayer_pot', 'shark'],
    reward: 'trident',
    flavor: 'O Kraken libera seu tridente — magia nunca mais será a mesma.',
  },
  {
    id: 'm48', title: 'Mestre Ladrão', diff: 'hard', type: 'Skilling', priority: 6,
    desc: 'Atingir 75 de Thieving roubando Elves em Prifddinas.',
    req: ['thieving_55'],
    reward: 'thieving_75',
    flavor: 'Nem os elfos conseguem te ver chegar.',
  },
  {
    id: 'm49', title: 'Blowpipe', diff: 'hard', type: 'Boss', priority: 10,
    desc: 'Fazer Zulrah até dropar Tanzanite Fang e criar o Toxic Blowpipe.',
    req: ['zulrah_access', 'ranging_pot', 'shark', 'antidote'],
    reward: 'blowpipe',
    flavor: 'O veneno da serpente se torna sua arma mais poderosa.',
  },
  {
    id: 'm50', title: 'Armadura Sagrada', diff: 'hard', type: 'Boss', priority: 8,
    desc: 'Completar 50 runs de Barrows e montar um set completo.',
    req: ['barrows_access', 'prayer_pot', 'shark'],
    reward: 'barrows_armor',
    flavor: 'Os irmãos se curvam — você porta o poder deles.',
  },

  // ════════════════════════════════════════════════════════════════════════════
  // LATE-MID GAME — preparação para Raids
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'm51', title: 'Portal dos Deuses', diff: 'easy', type: 'Quest', priority: 9,
    desc: 'Completar Troll Stronghold e Death Plateau para acessar o GWD.',
    req: ['rune_armor', 'prayer_43', 'shark'],
    reward: 'gwd_access',
    flavor: 'As portas da Dungeon dos Deuses se abrem para você.',
  },
  {
    id: 'm52', title: 'Altar Sagrado', diff: 'easy', type: 'Skilling', priority: 9,
    desc: 'Atingir 70 de Construction e construir altar de marble na POH.',
    req: ['construction_50'],
    reward: 'construction_70',
    flavor: 'Seu altar permite treinar Prayer sem sair de casa.',
  },
  {
    id: 'm53', title: 'Picada Suprema', diff: 'easy', type: 'Skilling', priority: 7,
    desc: 'Atingir 72 de Herblore e fazer Ranging Potions.',
    req: ['herblore_63'],
    reward: 'herblore_72',
    flavor: 'Sua Ranging Potion amplifica cada flecha disparada.',
  },
  {
    id: 'm54', title: 'Madeira Mágica', diff: 'easy', type: 'Skilling', priority: 6,
    desc: 'Atingir 75 de Woodcutting cortando Magic Trees.',
    req: ['woodcut_60'],
    reward: 'woodcut_75',
    flavor: 'As árvores mágicas revelam seus segredos para você.',
  },
  {
    id: 'm55', title: 'Artesão Supremo', diff: 'easy', type: 'Skilling', priority: 6,
    desc: 'Atingir 61 de Crafting fazendo dragonhide armor.',
    req: ['crafting_40'],
    reward: 'crafting_61',
    flavor: 'Suas mãos transformam couro de dragão em armadura.',
  },

  // ── Normal — late-mid ─────────────────────────────────────────────────────

  {
    id: 'm56', title: 'Dragão do Norte', diff: 'normal', type: 'Boss', priority: 10,
    desc: 'Completar Dragon Slayer II e fazer 10 kills de Vorkath.',
    req: ['rune_armor', 'prayer_70', 'shark', 'blowpipe'],
    reward: 'vorkath_access',
    flavor: 'Vorkath ruge e cai — seu ouro e drops transformam sua conta.',
  },
  {
    id: 'm57', title: 'General de Bandos', diff: 'normal', type: 'Boss', priority: 9,
    desc: 'Fazer 20 kills de General Graardor no GWD.',
    req: ['gwd_access', 'rune_armor', 'prayer_70', 'super_pot', 'shark'],
    reward: 'bandos_access',
    flavor: 'Graardor cai com um estrondo — Bandos armor é seu.',
  },
  {
    id: 'm58', title: 'Caçador de Abismos', diff: 'normal', type: 'Slayer', priority: 8,
    desc: 'Atingir 85 de Slayer e desbloquear Abyssal Demons.',
    req: ['slayer_70', 'd_scimitar', 'rune_armor', 'prayer_pot'],
    reward: 'slayer_85',
    flavor: 'Os demônios abissais chamam seu nome — você responde.',
  },
  {
    id: 'm59', title: 'Espada dos Deuses', diff: 'normal', type: 'Boss', priority: 8,
    desc: 'Fazer Bandos até dropar Bandos Godsword.',
    req: ['bandos_access', 'super_pot', 'shark', 'prayer_70'],
    reward: 'bandos_gs',
    flavor: 'A Godsword de Bandos pulsa com o poder dos deuses da guerra.',
  },
  {
    id: 'm60', title: 'Coleira do Cerbero', diff: 'normal', type: 'Slayer', priority: 8,
    desc: 'Atingir 91 de Slayer e fazer Cerberus até obter Primordial/Eternal/Pegasian Crystal.',
    req: ['slayer_85', 'prayer_70', 'super_pot', 'shark'],
    reward: 'cerberus_access',
    flavor: 'O cão de três cabeças uiva — e seus cristais valem um reino.',
  },

  // ── Hard — late-mid ───────────────────────────────────────────────────────

  {
    id: 'm61', title: 'Armadura dos Deuses', diff: 'hard', type: 'Boss', priority: 10,
    desc: 'Completar 50 kills de Bandos e obter Bandos Chestplate + Tassets.',
    req: ['bandos_access', 'prayer_70', 'super_pot', 'shark', 'dragon_boots'],
    reward: 'bandos_armor',
    flavor: 'A armadura de Bandos abraça seu corpo — você está pronto para os Raids.',
  },
  {
    id: 'm62', title: 'Chicote do Abismo', diff: 'hard', type: 'Slayer', priority: 10,
    desc: 'Fazer Abyssal Sire até dropar Abyssal Whip.',
    req: ['slayer_85', 'rune_armor', 'prayer_70', 'super_pot', 'shark'],
    reward: 'abyssal_whip',
    flavor: 'O chicote abissal vibra em sua mão — ataque nunca mais será limitado.',
  },
  {
    id: 'm63', title: 'Martelo do Caos', diff: 'hard', type: 'Boss', priority: 9,
    desc: 'Fazer Skeletal Wyverns/Corporeal Beast até obter Dragon Warhammer.',
    req: ['slayer_85', 'bandos_armor', 'prayer_70', 'super_pot', 'shark'],
    reward: 'd_warhammer',
    flavor: 'O martelo de dragão esmaga defesas como se fossem papel.',
  },
  {
    id: 'm64', title: 'Besta de Sangue', diff: 'hard', type: 'Boss', priority: 9,
    desc: 'Fazer Theatre of Blood prep: obter gear completo e 200+ kills de Vorkath.',
    req: ['bandos_armor', 'blowpipe', 'prayer_70', 'super_pot', 'dark_crab', 'vorkath_access'],
    reward: 'tob_prep',
    flavor: 'O Theatre of Blood aguarda — você está pronto para o maior desafio.',
  },
  {
    id: 'm65', title: 'Câmaras do Xeric', diff: 'hard', type: 'Boss', priority: 10,
    desc: 'Atingir stats mínimos (75+ em combate, 78 Herblore) e fazer primeira run de CoX.',
    req: ['bandos_armor', 'blowpipe', 'trident', 'prayer_70', 'super_pot', 'dark_crab', 'd_warhammer'],
    reward: 'cox_prep',
    flavor: 'As Câmaras do Xeric se abrem — sua jornada como raider começa.',
  },
]