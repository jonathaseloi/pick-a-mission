# RuneProfile API

Site: https://www.runeprofile.com  
API Base: `https://api.runeprofile.com/v1`  
Docs: https://api.runeprofile.com/v1/docs  
OpenAPI: https://api.runeprofile.com/v1/openapi.json

Plugin RuneLite que sincroniza dados do jogador (Collection Log, CAs, Quests, Diaries, Skills, Activities).

## Autenticação

Sem API key: 30 req/min (suficiente para uso em app).  
Com API key (via Discord): 120 req/min.  
Header recomendado: `User-Agent: PickAMission (@username)`

Cache server-side de 1 minuto — não há ganho em polling mais curto.

## Endpoints úteis para PAM

### Resumo da conta
```
GET /accounts/{username}
```
Retorna: tipo de conta (ironman/hcim/normal/gim), totais de skills/XP, quests completas, collection log (obtained/total), combat achievements por tier, achievement diaries.

```json
{
  "username": "DiouDiou",
  "accountType": { "key": "ironman" },
  "skills": { "totalLevel": 858, "totalXp": 4478073 },
  "quests": { "completed": 42, "earnedPoints": 83, "total": 199 },
  "collectionLog": { "obtained": 0, "total": 1701 },
  "combatAchievements": [...],
  "achievementDiaries": [...]
}
```

### Skills detalhados
```
GET /accounts/{username}/skills
```
Retorna: name, xp, level, virtualLevel, xpToNextLevel para cada skill.

### Quests
```
GET /accounts/{username}/quests
```
Retorna: id, name, points, type (free/members/mini), state (not_started/in_progress/finished).

### Collection Log — completo
```
GET /accounts/{username}/collection-log
```
Estrutura hierárquica: tabs > pages > items (id, name, quantity obtida).

### Collection Log — por tab
```
GET /accounts/{username}/collection-log/Bosses
GET /accounts/{username}/collection-log/Raids
GET /accounts/{username}/collection-log/Clues
GET /accounts/{username}/collection-log/Minigames
GET /accounts/{username}/collection-log/Other
```

### Collection Log — página específica
```
GET /accounts/{username}/collection-log/Bosses/Abyssal%20Sire
```

### Combat Achievements — tasks detalhadas
```
GET /accounts/{username}/combat-achievements/tasks
```
Retorna: tierId, tierName (Easy/Medium/Hard/Elite/Master/Grandmaster), name, description, type (Kill Count/Mechanical/Perfection/Restriction/Speed/Stamina), monster, completed.

### Achievement Diaries
```
GET /accounts/{username}/achievement-diaries
```
Progresso por região e tier (Easy/Medium/Hard/Elite).

### Activity Feed
```
GET /accounts/{username}/activities?limit=20&activityTypes=new_item_obtained,level_up
```
Tipos: level_up, new_item_obtained, achievement_diary_tier_completed, combat_achievement_tier_completed, quest_completed, maxed, xp_milestone, valuable_drop.

## Integração com PAM

| Feature PAM | Endpoint RuneProfile |
|---|---|
| Sync de níveis | `/skills` (substitui ou complementa OSRS Hiscores) |
| Collection log mini-tracker | `/collection-log/Bosses` |
| Quest progress | `/quests` — checar se quest está `finished` |
| CA tracker | `/combat-achievements/tasks` |
| Activity feed | `/activities` |
| Tipo de conta (verificar ironman) | `/accounts/{username}` |

## Notas

- Requer plugin RuneLite instalado e perfil público para ter dados atualizados
- `updatedAt` indica última sync do plugin — pode estar desatualizado se o jogador não usa o plugin
- Dados de Collection Log só existem se o plugin estiver ativo (não vem do Hiscores)
- Endpoint `/full` retorna tudo de uma vez mas é pesado — preferir endpoints individuais
