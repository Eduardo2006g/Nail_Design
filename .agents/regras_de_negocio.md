# Regras de Negócio Core - Plataforma para Nail Designer

Este documento compila as especificações de regras de negócio fundamentais que sustentam as tomadas de decisão na lógica do aplicativo.

## 1. Fluxo de Agendamentos e Calendário
*   **Agendamento Múltiplo / Dependente (Duração Dinâmica):** A duração total de um horário é a soma do(s) serviço(s) agendado(s) *mais* uma "Gordura/Respiro" constante (ex: 15 minutos adicionais fixos no final, estipulado pela admin, para assepsia de brocas, bancada e refeição).
*   **Bloqueio Categórico (Anti-Conflito):** É expressamente proibido o Double Booking (sobreposição), o algoritmo precisa verificar se o `[horario_desejado : horario_desejado + duracao_total]` colide com a mesma faixa temporal de compromissos já fixados ou bloqueios de feriado da profissional.
*   **Janelas de Restrição:** A disponibilização de agenda deve inibir agendamento muito imediato (antecedência mínima de *X* horas para agendamento) e precaver agendamentos longínquos (máximo visível de *Y* dias na frente, de acordo com abertura de agenda).

## 2. Gestão de Tráfego e Reagendamentos (Cancelamentos)
*   **Regra de Reagendamento Auto-serviço (Cliente):** Clientes tem permissão de reagendar seus próprios horários ou abdicarem *apenas* se o fato for consumado dentro do *Safe interval* (Exemplo: Fora das "24h contíguas" que antecedem seu horário marcado). Dentro deste limite a alteração é bloqueada administrativamente exigindo contato humano.
*   **Lista de Espera / Wait-list:** Quando uma data específica na plataforma demonstra-se lotada ou o horário específico requerido bloqueado, o cliente pode se alocar numa lista de intenção. Em caso de Reagendamento/Cancelamento da mesma data/horário por um terceiro, todas as candidatas na "Fila" para o período são notificadas imediatamente.

## 3. Estratégia de Notificação Multicanal
*   **Eventos de Disparo (Triggers):**
    *   Criação da Solicitação/Envio do Código Pix
    *   Assentimento e Confirmação do pagamento
    *   Alerta Lembrete de 48 Horas previas 
    *   Lembrete pontual de 24 horas *Check-in*
*   Notificações cruciais têm preferência em tráfego de WhatsApp (Alta taxa de retenção) e espelho em E-mail. 

## 4. Programa de Relacionamento (Fidelidade)
*   **MGM (Member gets Member) / Indicação:** Geração de *Promo-code* autoral distribuído aos usuários ativos. Cada primeira sessão consumada de nova indicação, verte em desconto residual de 30% estocástico para a conta do usuário originador ("Promotor").
