CREATE TABLE Bets (
    bet_id_swish VARCHAR(255) PRIMARY KEY,
    client_id INT,
    client_name VARCHAR(255),
    bet_type_id INT,
    bet_type VARCHAR(255),
    bet_price DECIMAL,
    bet_prob DECIMAL,
    book_risk DECIMAL,
    accepted_datetime_utc DATETIME,
    settled_date DATE,
    received_date DATE,
    is_active BOOLEAN,
    is_cashout BOOLEAN,
    is_inplay BOOLEAN,
    currency_id INT,
    country_id INT,
    state_id INT,
    parlay_type_id INT
);
CREATE TABLE BetComponents (
    component_id_swish VARCHAR(255) PRIMARY KEY,
    bet_id_swish VARCHAR(255),
    component_cnt_bet INT,
    selection VARCHAR(255),
    line DECIMAL,
    is_alternate BOOLEAN,
    book_risk_component DECIMAL,
    book_profit_gross_component DECIMAL,
    component_price DECIMAL,
    component_prob DECIMAL,
    component_num_bet INT,
    line_at_bet DECIMAL,
    prob_norm_at_bet DECIMAL,
    proj_at_bet DECIMAL,
    line_diff_at_bet DECIMAL,
    prob_diff_at_bet DECIMAL,
    FOREIGN KEY (bet_id_swish) REFERENCES Bets(bet_id_swish)
);
CREATE TABLE Events (
    event_id INT PRIMARY KEY,
    sport_id INT,
    sport VARCHAR(255),
    season INT,
    date DATE,
    datetime_utc DATETIME,
    event_status_id INT,
    event_type_id INT,
    team_id INT,
    opp_id INT,
    team_abbr VARCHAR(255),
    opp_abbr VARCHAR(255),
    home BOOLEAN,
    score INT,
    opp_score INT,
    period INT,
    gamestate_id INT,
    gamestate VARCHAR(255),
    event_time_id INT,
    event_time_remaining INT,
    market_duration_id INT,
    market_duration_value VARCHAR(255),
    market_duration_type VARCHAR(255),
    market_suspended_id INT,
    market_suspended_description VARCHAR(255)
);

CREATE TABLE Players (
    player_id INT PRIMARY KEY,
    player_name VARCHAR(255),
    pos_id INT,
    pos_abbr VARCHAR(255),
    game_played BOOLEAN,
    game_started BOOLEAN,
    actual DECIMAL,
    accepted_min_before_start DECIMAL,
    usage_at_bet DECIMAL,
    actual_at_bet DECIMAL,
    is_in_game BOOLEAN,
    usage_id INT,
    orig_proj_at_bet DECIMAL,
    event_id INT,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
);

