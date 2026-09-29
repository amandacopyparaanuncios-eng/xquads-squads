# Cadastro de clientes — relatório de tráfego

Edite esta tabela para incluir/remover clientes. A skill lê tudo daqui.

- **Plataformas:** `Meta`, `Google` ou `Meta + Google`
- **Meta:** `ad_account_id` numérico (sem `act_`). Cliente com várias contas: liste todas.
- **Google:** customer ID no formato `123-456-7890`. `preencher` = ainda não cadastrado (a skill avisa e pula). Todas as contas Google ficam sob a MCC **BRB** — troque para a conta certa pelo seletor da MCC.

| Cliente | Plataformas | Meta (ad_account_id) | Google (customer ID) |
|---|---|---|---|
| Dra Susana e Dra Graça | Meta | 10201780986866560 | – |
| Super Ótica | Meta | 916064770974987 | – |
| Pegapega (Ardalla) | Meta | CA01 734035767167473 · CA02 1378684613952763 · CA03 758568080605140 | – |
| Walencia Viagens | Meta | 1771658770889298 | – |
| Desapego das Raras | Meta | 1037209889029747 | – |
| SherekTur Gramado | Meta + Google | 691156079683130 | 413-818-3543 |
| Nuhtella | Meta + Google | 2667422203440713 | 984-216-6245 |
| IMC Equipamentos | Google | – | 122-795-0460 |
| FSouza Express | Google | – | 571-306-3190 |

## Fora do relatório
- Lua Mundi (126654237543178) e Luiza Occhi (1089151007124055): não são mais clientes.
- Dra Ingrid Luckmann (1568470863610848), CA 02 MedBrand (957544795935898) e Amanda Sobrinho (1749356866341256): não incluídas na divisão atual — adicione uma linha acima para incluir.
