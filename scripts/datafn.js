

export const extractBetData = (record) => ({
    bet_id_swish: record.bet_id_swish,
    client_id: record.client_id,
    client_name: record.client_name,
    bet_type_id: record.bet_type_id,
    bet_type: record.bet_type,
    bet_price: record.bet_price,
    bet_prob: record.bet_prob,
    book_risk: record.book_risk,
    accepted_datetime_utc: record.accepted_datetime_utc,
    settled_date: record.settled_date,
    received_date: record.received_date,
    is_active: record.is_active,
    is_cashout: record.is_cashout,
    is_inplay: record.is_inplay,
    currency_id: record.currency_id,
    country_id: record.country_id,
    state_id: record.state_id,
    parlay_type_id: record.parlay_type_id
});

export const extractComponentData = (record) => ({
    component_id_swish: record.component_id_swish,
    bet_id_swish: record.bet_id_swish,
    component_cnt_bet: record.component_cnt_bet,
    selection: record.selection,
    line: record.line,
    is_alternate: record.is_alternate,
    book_risk_component: record.book_risk_component,
    book_profit_gross_component: record.book_profit_gross_component,
    component_price: record.component_price,
    component_prob: record.component_prob,
    component_num_bet: record.component_num_bet,
    line_at_bet: record.line_at_bet,
    prob_norm_at_bet: record.prob_norm_at_bet,
    proj_at_bet: record.proj_at_bet,
    line_diff_at_bet: record.line_diff_at_bet,
    prob_diff_at_bet: record.prob_diff_at_bet
});

export const extractEventData = (record) => ({
    event_id: record.event_id,
    sport_id: record.sport_id,
    sport: record.sport,
    season: record.season,
    date: record.date,
    datetime_utc: record.datetime_utc,
    event_status_id: record.event_status_id,
    event_type_id: record.event_type_id,
    team_id: record.team_id,
    opp_id: record.opp_id,
    team_abbr: record.team_abbr,
    opp_abbr: record.opp_abbr,
    home: record.home,
    score: record.score,
    opp_score: record.opp_score,
    period: record.period,
    gamestate_id: record.gamestate_id,
    gamestate: record.gamestate,
    event_time_id: record.event_time_id,
    event_time_remaining: record.event_time_remaining,
    market_duration_id: record.market_duration_id,
    market_duration_value: record.market_duration_value,
    market_duration_type: record.market_duration_type,
    market_suspended_id: record.market_suspended_id,
    market_suspended_description: record.market_suspended_description
});

export const extractPlayerData = (record) => ({
    player_id: record.player_id,
    player_name: record.player_name,
    pos_id: record.pos_id,
    pos_abbr: record.pos_abbr,
    game_played: record.game_played,
    game_started: record.game_started,
    actual: record.actual,
    accepted_min_before_start: record.accepted_min_before_start,
    usage_at_bet: record.usage_at_bet,
    actual_at_bet: record.actual_at_bet,
    is_in_game: record.is_in_game,
    usage_id: record.usage_id,
    orig_proj_at_bet: record.orig_proj_at_bet
});




