// ─────────────────────────────────────────────────────────────────────────────
// UNLOCKS
// category: 'skill' | 'weapon' | 'armor' | 'food' | 'potion' | 'activity' | 'boss' | 'other'
// ─────────────────────────────────────────────────────────────────────────────

export const UNLOCKS = {
  // ── Melee weapons ──────────────────────────────────────────────────────────
  bronze_sword:     { label: 'Usar Bronze Sword',                    icon: '⚔️', category: 'weapon' },
  iron_sword:       { label: 'Usar Iron Sword',                      icon: '⚔️', category: 'weapon' },
  steel_scimitar:   { label: 'Usar Steel Scimitar',                  icon: '⚔️', category: 'weapon' },
  mithril_scim:     { label: 'Usar Mithril Scimitar',                icon: '⚔️', category: 'weapon' },
  rune_scimitar:    { label: 'Usar Rune Scimitar',                   icon: '⚔️', category: 'weapon' },
  d_scimitar:       { label: 'Usar Dragon Scimitar',                 icon: '⚔️', category: 'weapon' },
  abyssal_whip:     { label: 'Usar Abyssal Whip',                    icon: '⚔️', category: 'weapon' },
  bludgeon:         { label: 'Usar Abyssal Bludgeon',                icon: '⚔️', category: 'weapon' },
  d_warhammer:      { label: 'Usar Dragon Warhammer',                icon: '⚔️', category: 'weapon' },
  bandos_gs:        { label: 'Usar Bandos Godsword',                 icon: '⚔️', category: 'weapon' },
  giant_club:       { label: 'Usar Giant Club',                      icon: '🪨', category: 'weapon' },

  // ── Armor — melee ──────────────────────────────────────────────────────────
  leather_armor:    { label: 'Usar Leather Armor',                   icon: '🛡️', category: 'armor' },
  iron_armor:       { label: 'Usar Iron Chainbody',                  icon: '🛡️', category: 'armor' },
  steel_armor:      { label: 'Usar Steel Platebody',                 icon: '🛡️', category: 'armor' },
  mithril_armor:    { label: 'Usar Mithril Platebody',               icon: '🛡️', category: 'armor' },
  rune_armor:       { label: 'Usar Rune Platebody',                  icon: '🛡️', category: 'armor' },
  fighter_torso:    { label: 'Usar Fighter Torso',                   icon: '🛡️', category: 'armor' },
  bandos_armor:     { label: 'Usar Bandos Chestplate + Tassets',     icon: '🛡️', category: 'armor' },
  barrows_armor:    { label: 'Usar um set de Barrows',               icon: '🛡️', category: 'armor' },
  mithril_boots:    { label: 'Usar Mithril Boots',                   icon: '👢', category: 'armor' },
  dragon_boots:     { label: 'Usar Dragon Boots',                    icon: '👢', category: 'armor' },
  berserker_ring:   { label: 'Usar Berserker Ring',                  icon: '💍', category: 'armor' },
  void_melee:       { label: 'Usar Void Melee Set',                  icon: '🛡️', category: 'armor' },

  // ── Ranged ─────────────────────────────────────────────────────────────────
  shortbow:         { label: 'Usar Shortbow + Bronze Arrows',        icon: '🏹', category: 'weapon' },
  oak_shortbow:     { label: 'Usar Oak Shortbow + Iron Arrows',      icon: '🏹', category: 'weapon' },
  maple_shortbow:   { label: 'Usar Maple Shortbow + Mithril Arrows', icon: '🏹', category: 'weapon' },
  magic_shortbow:   { label: 'Usar Magic Shortbow + Amethyst Arrows',icon: '🏹', category: 'weapon' },
  blowpipe:         { label: 'Usar Toxic Blowpipe',                  icon: '🏹', category: 'weapon' },
  armadyl_cbow:     { label: 'Usar Armadyl Crossbow',                icon: '🏹', category: 'weapon' },
  dhcb:             { label: 'Usar Dragon Hunter Crossbow',          icon: '🏹', category: 'weapon' },
  void_ranged:      { label: 'Usar Void Ranged Set',                 icon: '🏹', category: 'armor' },
  armadyl_armor:    { label: 'Usar Armadyl Chestplate + Chainskirt', icon: '🛡️', category: 'armor' },
  ranger_boots:     { label: 'Usar Ranger Boots',                    icon: '👢', category: 'armor' },
  archers_ring:     { label: 'Usar Archers Ring (i)',                icon: '💍', category: 'armor' },

  // ── Magic ──────────────────────────────────────────────────────────────────
  magic_teleport:   { label: 'Usar Varrock Teleport',                icon: '🔮', category: 'other' },
  alch:             { label: 'Usar High Alch',                       icon: '🔮', category: 'other' },
  ice_barrage:      { label: 'Usar Ice Barrage',                     icon: '🔮', category: 'weapon' },
  trident:          { label: 'Usar Trident of the Seas',             icon: '🔮', category: 'weapon' },
  sang_staff:       { label: 'Usar Sanguinesti Staff',               icon: '🔮', category: 'weapon' },
  void_mage:        { label: 'Usar Void Mage Set',                   icon: '🛡️', category: 'armor' },
  ancestral_armor:  { label: 'Usar Ancestral Robe Set',              icon: '🛡️', category: 'armor' },
  occult:           { label: 'Usar Occult Necklace',                 icon: '💍', category: 'armor' },
  mages_book:       { label: 'Usar Mage\'s Book / Arcane',           icon: '📖', category: 'weapon' },

  // ── Food ───────────────────────────────────────────────────────────────────
  lobster:          { label: 'Comer Lobster',                        icon: '🦞', category: 'food' },
  swordfish:        { label: 'Comer Swordfish',                      icon: '🐟', category: 'food' },
  shark:            { label: 'Comer Shark',                          icon: '🦈', category: 'food' },
  anglerfish:       { label: 'Comer Anglerfish',                     icon: '🐠', category: 'food' },
  dark_crab:        { label: 'Comer Dark Crab',                      icon: '🦀', category: 'food' },

  // ── Potions ────────────────────────────────────────────────────────────────
  prayer_pot:       { label: 'Usar Prayer Potion',                   icon: '✨', category: 'potion' },
  super_pot:        { label: 'Usar Super Combat Potion',             icon: '⚗️', category: 'potion' },
  ranging_pot:      { label: 'Usar Ranging Potion',                  icon: '⚗️', category: 'potion' },
  antidote:         { label: 'Usar Antidote++',                      icon: '⚗️', category: 'potion' },
  overload:         { label: 'Usar Overload (NMZ)',                  icon: '⚗️', category: 'potion' },
  sanfew:           { label: 'Usar Sanfew Serum',                    icon: '⚗️', category: 'potion' },
  extended_super_anti: { label: 'Usar Extended Super Antipoison',    icon: '⚗️', category: 'potion' },

  // ── Skill milestones ──────────────────────────────────────────────────────
  prayer_43:        { label: 'Protect from Melee desbloqueado', icon: '🙏', category: 'activity' },
  prayer_70:        { label: 'Piety desbloqueado',              icon: '🙏', category: 'activity' },
  magic_55:         { label: 'High Alchemy desbloqueado',       icon: '🔮', category: 'activity' },

  // ── Activities ─────────────────────────────────────────────────────────────
  slayer_access:    { label: 'Fazer tarefas de Slayer',              icon: '💀', category: 'activity' },
  barrows_access:   { label: 'Fazer Barrows runs',                   icon: '⚰️', category: 'activity' },
  nmz_access:       { label: 'Fazer NMZ',                            icon: '🏟️', category: 'activity' },
  wintertodt:       { label: 'Fazer Wintertodt runs',                icon: '❄️', category: 'activity' },
  tempoross:        { label: 'Fazer Tempoross runs',                 icon: '🌊', category: 'activity' },
  tithe_farm:       { label: 'Fazer Tithe Farm',                     icon: '🌾', category: 'activity' },
  birdhouse:        { label: 'Fazer Bird House runs',                icon: '🐦', category: 'activity' },
  farming_runs:     { label: 'Fazer herb + tree farm runs',          icon: '🌿', category: 'activity' },
  cox_prep:         { label: 'Preparado para Chambers of Xeric',     icon: '🏛️', category: 'activity' },
  tob_prep:         { label: 'Preparado para Theatre of Blood',      icon: '🩸', category: 'activity' },

  // ── Boss access ────────────────────────────────────────────────────────────
  zulrah_access:    { label: 'Fazer Zulrah',                         icon: '🐍', category: 'boss' },
  vorkath_access:   { label: 'Fazer Vorkath',                        icon: '🐉', category: 'boss' },
  gwd_access:       { label: 'Acessar God Wars Dungeon',             icon: '⚔️', category: 'boss' },
  bandos_access:    { label: 'Fazer General Graardor',               icon: '👹', category: 'boss' },
  armadyl_access:   { label: 'Fazer Commander Zilyana',              icon: '👼', category: 'boss' },
  cerberus_access:  { label: 'Fazer Cerberus',                       icon: '🐕', category: 'boss' },
  abyssal_sire:     { label: 'Fazer Abyssal Sire',                   icon: '👁️', category: 'boss' },
  grotesque_access: { label: 'Fazer Grotesque Guardians',            icon: '🗿', category: 'boss' },

  // ── Quest completions ──────────────────────────────────────────────────────
  // q_waterfall, q_cooks_assistant, q_dorics, q_stronghold, q_knights_sword
  // são rastreados internamente (req checks) mas sem label visível no tab
  q_priest_peril:   { label: 'Morytania desbloqueada',                 icon: '📜', category: 'quest' },
  q_biohazard:      { label: 'Regicide desbloqueado',                  icon: '📜', category: 'quest' },
  q_fairytale1:     { label: 'Fairy Rings desbloqueadas',              icon: '📜', category: 'quest' },
  q_rune_mysteries: { label: 'Runecrafting desbloqueado',              icon: '📜', category: 'quest' },
  q_druidic:        { label: 'Herblore desbloqueado',                  icon: '📜', category: 'quest' },
  q_ds1:            { label: 'Rune Platebody desbloqueada',            icon: '📜', category: 'quest' },
  q_mm1:            { label: 'Dragon Scimitar desbloqueada',           icon: '📜', category: 'quest' },
  q_rfd:            { label: 'Mithril Gloves desbloqueadas',           icon: '📜', category: 'quest' },
  q_regicide:       { label: 'Zulrah desbloqueado',                    icon: '📜', category: 'quest' },
  q_mm2:            { label: 'Demonic Gorillas + Zenyte desbloqueados',icon: '📜', category: 'quest' },
  q_ds2:            { label: 'Vorkath desbloqueado',                   icon: '📜', category: 'quest' },
  q_sote:           { label: 'Prifddinas desbloqueada',                icon: '📜', category: 'quest' },
  q_dt1:            { label: 'Ancient Magicks desbloqueado',           icon: '📜', category: 'quest' },
  q_dt2:            { label: 'DT2 Bosses desbloqueados',               icon: '📜', category: 'quest' },

  // ── Activities desbloqueadas ───────────────────────────────────────────────
  a_slayer:         { label: 'Slayer desbloqueado',                    icon: '🗡️', category: 'activity' },
  a_barrows:        { label: 'Barrows desbloqueado',                   icon: '⚰️', category: 'activity' },
  a_wintertodt:     { label: 'Wintertodt desbloqueado',                icon: '❄️', category: 'activity' },
  a_birdhouse:      { label: 'Bird House Runs desbloqueadas',          icon: '🐦', category: 'activity' },
  a_tempoross:      { label: 'Tempoross desbloqueado',                 icon: '🌊', category: 'activity' },
  a_farming_runs:   { label: 'Herb + Tree Runs desbloqueadas',         icon: '🌿', category: 'activity' },
  a_nmz:            { label: 'Nightmare Zone desbloqueado',            icon: '😴', category: 'activity' },
  a_gwd:            { label: 'God Wars Dungeon desbloqueado',          icon: '⚔️', category: 'activity' },
  a_gauntlet:       { label: 'Corrupted Gauntlet desbloqueado',        icon: '🏰', category: 'activity' },
  a_cox:            { label: 'Chambers of Xeric desbloqueado',         icon: '🏛️', category: 'activity' },
  a_tob:            { label: 'Theatre of Blood desbloqueado',          icon: '🩸', category: 'activity' },
  a_toa:            { label: 'Tombs of Amascut desbloqueado',          icon: '🏺', category: 'activity' },

  // ── Marcos de itens ───────────────────────────────────────────────────────
  i_fighter_torso:  { label: 'Fighter Torso obtido (BA)',              icon: '🛡️', category: 'item' },
  i_d_boots:        { label: 'Dragon Boots obtidas (Spiritual Mages)', icon: '👢', category: 'item' },
  i_d_defender:     { label: 'Dragon Defender obtido (Warrior\'s Guild)',icon: '🛡️', category: 'item' },
  i_whip:           { label: 'Abyssal Whip obtida (Abyssal Demons)',   icon: '⚔️', category: 'item' },
  i_fire_cape:      { label: 'Fire Cape obtida (Fight Caves)',         icon: '🔥', category: 'item' },
  i_blowpipe:       { label: 'Toxic Blowpipe criado (Zulrah)',         icon: '🏹', category: 'item' },
  i_bandos_chest:   { label: 'Bandos Chestplate obtida (Graardor)',    icon: '🛡️', category: 'item' },
  i_bandos_tassets: { label: 'Bandos Tassets obtidas (Graardor)',      icon: '🛡️', category: 'item' },
  i_armadyl_helm:   { label: "Armadyl Helm obtido (Kree'arra)",        icon: '🪖', category: 'item' },
  i_dwh:            { label: 'Dragon Warhammer obtido (Shamans)',      icon: '🔨', category: 'item' },
  i_dhcb:           { label: 'Dragon Hunter Crossbow (Vorkath)',       icon: '🏹', category: 'item' },
  i_twisted_bow:    { label: 'Twisted Bow obtido (CoX)',               icon: '🏹', category: 'item' },
  i_infernal_cape:  { label: 'Infernal Cape obtida (Inferno)',         icon: '🔥', category: 'item' },
  i_scythe:         { label: 'Scythe of Vitur obtida (ToB)',           icon: '⚔️', category: 'item' },

  // ── Outros ────────────────────────────────────────────────────────────────
  zenyte_access:    { label: 'Zenyte Jewelry desbloqueada',            icon: '🏆', category: 'other' },
  ca_medium:        { label: 'Combat Achievements Medium completo',    icon: '🏆', category: 'other' },
  slayer_helm:      { label: 'Slayer Helm imbued obtido',              icon: '🪖', category: 'item' },
  kbd_access:       { label: 'Fazer King Black Dragon',                icon: '🐲', category: 'boss' },
  sarachnis_access: { label: 'Fazer Sarachnis',                        icon: '🕷️', category: 'boss' },

  // ── Combat Achievement milestones (auto-sync via RuneProfile) ─────────────
  ca_10:            { label: '10 Combat Achievements obtidos',         icon: '🏆', category: 'activity' },
  ca_20:            { label: '20 Combat Achievements obtidos',         icon: '🏆', category: 'activity' },
  ca_50:            { label: '50 Combat Achievements obtidos',         icon: '🏆', category: 'activity' },
  ca_100:           { label: '100 Combat Achievements obtidos',        icon: '🏆', category: 'activity' },
  ca_easy_done:     { label: 'CA Easy tier completo (33)',             icon: '🏆', category: 'activity' },
  ca_medium_done:   { label: 'CA Medium tier completo (41)',           icon: '🏆', category: 'activity' },
  ca_hard_done:     { label: 'CA Hard tier completo (65)',             icon: '🏆', category: 'activity' },

  // ── Achievement Diary completions (auto-sync via RuneProfile) ────────────
  diary_lumbridge_easy:   { label: 'Lumbridge & Draynor Diary Easy',   icon: '📋', category: 'activity' },
  diary_varrock_easy:     { label: 'Varrock Diary Easy',               icon: '📋', category: 'activity' },
  diary_falador_easy:     { label: 'Falador Diary Easy',               icon: '📋', category: 'activity' },
  diary_karamja_easy:     { label: 'Karamja Diary Easy',               icon: '📋', category: 'activity' },
  diary_ardougne_easy:    { label: 'Ardougne Diary Easy',              icon: '📋', category: 'activity' },
  diary_morytania_easy:   { label: 'Morytania Diary Easy',             icon: '📋', category: 'activity' },
  diary_lumbridge_medium: { label: 'Lumbridge & Draynor Diary Medium', icon: '📋', category: 'activity' },
  diary_varrock_medium:   { label: 'Varrock Diary Medium',             icon: '📋', category: 'activity' },
  diary_ardougne_medium:  { label: 'Ardougne Diary Medium',            icon: '📋', category: 'activity' },
  diary_morytania_medium: { label: 'Morytania Diary Medium',           icon: '📋', category: 'activity' },
}