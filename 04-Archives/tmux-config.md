# ==============================================================================

# PREFIX CONFIGURATION

# ==============================================================================

# Change the primary prefix from C-b to Ctrl+Space (easier to reach)

set -g prefix C-Space

# Keep Ctrl-b as a secondary prefix (optional)

set -g prefix2 C-b

# Allow sending Ctrl+Space to the inner application by pressing it twice

bind C-Space send-prefix

# ==============================================================================

# CONFIG RELOAD

# ==============================================================================

# Press Prefix + q to reload this config file and see a confirmation message

bind q source-file ~/.config/tmux/tmux.conf \; display "Configuration reloaded"

# ==============================================================================

# COPY MODE (VI STYLE)

# ==============================================================================

# Use Vi-style keybindings (h, j, k, l) when in copy mode

setw -g mode-keys vi

# Start selection with 'v' (like Visual mode in Vim)

bind -T copy-mode-vi v send -X begin-selection

# Yank/copy selection with 'y' and exit copy mode

bind -T copy-mode-vi y send -X copy-selection-and-cancel

# ==============================================================================

# PANE CONTROLS

# ==============================================================================

# Split panes and stay in the current working directory

bind h split-window -v -c "#{pane_current_path}" # Horizontal split (top/bottom)
bind v split-window -h -c "#{pane_current_path}" # Vertical split (left/right)
bind x kill-pane # Close current pane

# Switch panes using Ctrl + Alt + Arrow keys (No prefix required)

bind -n C-M-Left select-pane -L
bind -n C-M-Right select-pane -R
bind -n C-M-Up select-pane -U
bind -n C-M-Down select-pane -D

# Resize panes using Ctrl + Alt + Shift + Arrow keys (No prefix required)

bind -n C-M-S-Left resize-pane -L 5
bind -n C-M-S-Down resize-pane -D 5
bind -n C-M-S-Up resize-pane -U 5
bind -n C-M-S-Right resize-pane -R 5

# ==============================================================================

# WINDOW NAVIGATION

# ==============================================================================

# Prefix + r to rename the current window

bind r command-prompt -I "#W" "rename-window -- '%%'"

# Prefix + c to create a new window in the current path

bind c new-window -c "#{pane_current_path}"

# Prefix + k to kill current window

bind k kill-window

# Jump to specific windows using Alt + Number (No prefix required)

bind -n M-1 select-window -t 1
bind -n M-2 select-window -t 2

# ... (3 through 8)

bind -n M-9 select-window -t 9

# Cycle through windows using Alt + Left/Right

bind -n M-Left select-window -t -1
bind -n M-Right select-window -t +1

# Reorder windows: Alt + Shift + Left/Right moves the window position

bind -n M-S-Left swap-window -t -1 \; select-window -t -1
bind -n M-S-Right swap-window -t +1 \; select-window -t +1

# ==============================================================================

# SESSION CONTROLS

# ==============================================================================

bind R command-prompt -I "#S" "rename-session -- '%%'" # Rename current session
bind C new-session -c "#{pane_current_path}" # New session in current path
bind K kill-session # Kill current session
bind P switch-client -p # Previous session
bind N switch-client -n # Next session

# Switch sessions using Alt + Up/Down (No prefix required)

bind -n M-Up switch-client -p
bind -n M-Down switch-client -n

# ==============================================================================

# GENERAL SETTINGS

# ==============================================================================

set -g default-terminal "tmux-256color" # Support 256 colors
set -ag terminal-overrides ",\*:RGB" # Enable TrueColor (24-bit color)
set -g mouse on # Enable mouse support (scrolling, clicking)
set -g base-index 1 # Start window numbering at 1 (easier for keyboard)
setw -g pane-base-index 1 # Start pane numbering at 1
set -g renumber-windows on # Automatically renumber windows when one is closed
set -g history-limit 50000 # Keep 50k lines of scrollback history
set -g escape-time 0 # Remove delay when pressing Esc (critical for Vim)
set -g focus-events on # Pass focus events to apps inside tmux
set -g set-clipboard on # Use system clipboard
set -g allow-passthrough on # Allow apps to send escape sequences to terminal
setw -g aggressive-resize on # Resize windows based on the smallest active client
set -g detach-on-destroy off # Don't close tmux when the last window of a session is killed

# ==============================================================================

# STATUS BAR & THEME

# ==============================================================================

set -g status-position top # Move status bar to the top
set -g status-interval 5 # Update status bar every 5 seconds
set -g status-left-length 30 # Max length for left status
set -g status-right-length 50 # Max length for right status
set -g window-status-separator "" # Remove space between window tabs
set -gw automatic-rename on # Auto rename windows based on active process
set -gw automatic-rename-format '#{b:pane_current_path}' # Rename to current folder name

# Styling colors (Blue and Dark/Black theme)

set -g status-style "bg=default,fg=default" # Transparent status bar
set -g status-left "#[fg=black,bg=blue,bold] #S #[bg=default] " # Session name in blue box

# Right status shows dynamic flags: COPY mode, PREFIX active, or ZOOMED pane

set -g status-right "#[fg=blue]#{?pane_in_mode,COPY ,}#{?client_prefix,PREFIX ,}#{?window_zoomed_flag,ZOOM ,}#[fg=brightblack]#h "
set -g window-status-format "#[fg=brightblack] #I:#W " # Inactive window style
set -g window-status-current-format "#[fg=blue,bold] #I:#W " # Active window style (Blue)
set -g pane-border-style "fg=brightblack"
set -g pane-active-border-style "fg=blue"
set -g message-style "bg=default,fg=blue"
set -g mode-style "bg=blue,fg=black"
setw -g clock-mode-colour blue
