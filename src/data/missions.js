// ─────────────────────────────────────────────────────────────────────────────
// MISSIONS
// diff: "easy" | "normal" | "hard"
// type: Skilling | Quest | Boss | Dungeon | Diary | Grind | Slayer | Combat Achievement
// req: array de IDs de UNLOCKS que o jogador precisa ter para a missão aparecer
// reward: ID de um UNLOCK que será desbloqueado ao completar
// ─────────────────────────────────────────────────────────────────────────────

export const MISSIONS = [
  // ── EASY ───────────────────────────────────────────────────────────────────
  {
    id: 'm01', title: 'Primeiro Passo', diff: 'easy', type: 'Skilling',
    desc: 'Roubar um Homem (Man) 10 vezes em Lumbridge.',
    req: [],
    reward: 'bronze_sword',
    flavor: 'Um ferreiro se impressiona com sua coragem e te entrega uma espada.',
  },
  {
    id: 'm02', title: 'Corpo Robusto', diff: 'easy', type: 'Skilling',
    desc: 'Atingir nível 10 de Defence.',
    req: [],
    reward: 'leather_armor',
    flavor: 'Com treino suficiente você aprende a se proteger com couro.',
  },
  {
    id: 'm03', title: 'Olho de Arqueiro', diff: 'easy', type: 'Skilling',
    desc: 'Atingir nível 5 de Ranged.',
    req: [],
    reward: 'shortbow',
    flavor: 'Você acha um arco curto abandonado na floresta.',
  },
  {
    id: 'm04', title: 'Das Águas', diff: 'easy', type: 'Skilling',
    desc: 'Pescar e cozinhar 20 Shrimps.',
    req: [],
    reward: 'fishing_40',
    flavor: 'Um pescador veterano te ensina técnicas avançadas.',
  },
  {
    id: 'm05', title: 'Lenhador Iniciante', diff: 'easy', type: 'Skilling',
    desc: 'Cortar 50 troncos de Willow.',
    req: [],
    reward: 'woodcut_60',
    flavor: 'Suas mãos ficam calejadas, mas o machado obedece.',
  },
  {
    id: 'm06', title: 'Serviço à Coroa', diff: 'easy', type: 'Quest',
    desc: "Completar a quest Cook's Assistant.",
    req: [],
    reward: 'attack_30',
    flavor: 'O Duque de Lumbridge te treina pessoalmente como recompensa.',
  },
  {
    id: 'm07', title: 'Flecha Reta', diff: 'easy', type: 'Skilling',
    desc: 'Atingir nível 20 de Ranged.',
    req: ['shortbow'],
    reward: 'oak_shortbow',
    flavor: 'Você talha seu próprio arco de carvalho.',
  },
  {
    id: 'm08', title: 'Forja Simples', diff: 'easy', type: 'Quest',
    desc: "Completar a quest Doric's Quest.",
    req: [],
    reward: 'attack_30',
    flavor: 'Doric te ensina o básico da metalurgia.',
  },

  // ── NORMAL ─────────────────────────────────────────────────────────────────
  {
    id: 'm09', title: 'Guerreiro de Ferro', diff: 'normal', type: 'Dungeon',
    desc: 'Completar o Stronghold of Security (todos os andares).',
    req: ['bronze_sword', 'leather_armor'],
    reward: 'iron_sword',
    flavor: 'Nas profundezas do Stronghold você acha uma espada de ferro.',
  },
  {
    id: 'm10', title: 'Armadura Sólida', diff: 'normal', type: 'Quest',
    desc: "Atingir nível 20 de Defence e completar Knight's Sword.",
    req: ['leather_armor'],
    reward: 'iron_armor',
    flavor: 'Sir Vyvin te recompensa com armadura de ferro.',
  },
  {
    id: 'm11', title: 'Pescador de Lagostas', diff: 'normal', type: 'Skilling',
    desc: 'Pescar e cozinhar 50 Lobsters em Catherby.',
    req: ['fishing_40'],
    reward: 'lobster',
    flavor: 'Sua técnica de pesca evolui.',
  },
  {
    id: 'm12', title: 'Bênção Divina', diff: 'normal', type: 'Quest',
    desc: 'Atingir nível 37 de Prayer e completar Priest in Peril.',
    req: ['iron_armor'],
    reward: 'prayer_pot',
    flavor: 'O Padre Drezel te ensina a preparar poções de oração.',
  },
  {
    id: 'm13', title: 'Sangue de Dragão', diff: 'normal', type: 'Quest',
    desc: 'Completar a quest Dragon Slayer I.',
    req: ['iron_sword', 'iron_armor', 'lobster'],
    reward: 'mithril_armor',
    flavor: 'As escamas de Elvarg se transformam numa armadura de mithril.',
  },
  {
    id: 'm14', title: 'Arqueiro Dedicado', diff: 'normal', type: 'Skilling',
    desc: 'Atingir nível 40 de Ranged.',
    req: ['oak_shortbow'],
    reward: 'ranged_40',
    flavor: 'Sua pontaria melhora consideravelmente.',
  },
  {
    id: 'm15', title: 'Fé de Guerreiro', diff: 'normal', type: 'Skilling',
    desc: 'Atingir nível 43 de Prayer.',
    req: ['prayer_pot'],
    reward: 'prayer_43',
    flavor: 'Você aprende a oração Protect from Melee.',
  },
  {
    id: 'm16', title: 'Machadeiro', diff: 'normal', type: 'Grind',
    desc: 'Matar 50 Hill Giants no Edgeville Dungeon.',
    req: ['iron_sword', 'iron_armor'],
    reward: 'strength_40',
    flavor: 'Meses lutando contra gigantes te deixam muito mais forte.',
  },

  // ── HARD ───────────────────────────────────────────────────────────────────
  {
    id: 'm17', title: 'Gigante das Cavernas', diff: 'hard', type: 'Boss',
    desc: 'Matar Obor 3 vezes (Hill Giant Boss).',
    req: ['iron_sword', 'iron_armor', 'lobster'],
    reward: 'giant_club',
    flavor: 'Você derrota o Rei dos Gigantes e saqueia seu clube.',
  },
  {
    id: 'm18', title: 'Mestre do Aço', diff: 'hard', type: 'Diary',
    desc: 'Completar Varrock Diary (Easy) e atingir 50 de Attack.',
    req: ['iron_sword', 'iron_armor', 'attack_30'],
    reward: 'steel_scimitar',
    flavor: 'Os guardas de Varrock reconhecem seu valor.',
  },
  {
    id: 'm19', title: 'Flecha Certeira', diff: 'hard', type: 'Combat Achievement',
    desc: 'Atingir 60 de Ranged e completar o Easy Ranged CA.',
    req: ['oak_shortbow', 'ranged_40'],
    reward: 'maple_shortbow',
    flavor: 'Seu arco de maple é esculpido por um elfo.',
  },
  {
    id: 'm20', title: 'Caçador de Monstros', diff: 'hard', type: 'Slayer',
    desc: 'Falar com Turael e completar 20 tarefas de Slayer.',
    req: ['steel_scimitar', 'iron_armor', 'lobster'],
    reward: 'slayer_access',
    flavor: 'Turael te reconhece como um verdadeiro caçador.',
  },
  {
    id: 'm21', title: 'Descendente do Macaco', diff: 'hard', type: 'Quest',
    desc: 'Completar Monkey Madness I.',
    req: ['mithril_armor', 'prayer_43', 'lobster'],
    reward: 'd_scimitar',
    flavor: 'Você ganha a confiança dos gnomos e recebe uma lâmina de dragão.',
  },
  {
    id: 'm22', title: 'Guerreiro do Barrows', diff: 'hard', type: 'Boss',
    desc: 'Completar 10 runs de Barrows com pelo menos 2 itens abertos por run.',
    req: ['d_scimitar', 'mithril_armor', 'prayer_43', 'prayer_pot', 'shark'],
    reward: 'barrows_access',
    flavor: 'Os espíritos do Barrows te cedem passagem livre.',
  },
  {
    id: 'm23', title: 'Arqueiro Supremo', diff: 'hard', type: 'Combat Achievement',
    desc: 'Atingir 70 de Ranged e completar o Hard Ranged CA.',
    req: ['maple_shortbow', 'ranged_60'],
    reward: 'magic_shortbow',
    flavor: 'Você recebe um arco mágico de um mago ancião.',
  },
  {
    id: 'm24', title: 'Super Guerreiro', diff: 'hard', type: 'Quest',
    desc: "Atingir 55 de Herblore e completar a quest 'Jungle Potion'.",
    req: ['attack_50', 'strength_60', 'defence_60'],
    reward: 'super_pot',
    flavor: 'Sanfew te ensina a fazer super poções de combate.',
  },
]