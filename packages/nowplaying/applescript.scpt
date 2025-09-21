#!/usr/bin/osascript

set spotifyApp to "Spotify"
set musicApp to "Music"

set applicationName to ""
set state to "stopped"
set trackname to ""
set artistname to ""
-- set trackduration to 0
-- set playerposition to 0
set myError to ""

-- set debug to {}

# Spotify
if application spotifyApp is running then
	tell application "Spotify"
		if the player state is playing then
			set applicationName to spotifyApp
			set state to "playing"
			set trackname to "" & the name of current track
			set artistname to "" & the artist of current track
			-- set trackduration to the (duration of current track) / 1000
			-- set playerposition to the player position

			-- set debug to (properties of current track)
		end if
	end tell
end if

# Music
if application musicApp is running then
	tell application "Music"
		try
			if the player state is playing then
				set applicationName to musicApp
				set state to "playing"
				set trackname to "" & the name of current track
				set artistname to "" & the artist of current track
				-- set trackduration to the (duration of current track)
				-- set playerposition to the player position

				-- set debug to (properties of current track)
			end if
		on error errMsg number errNum
			-- Music is running but no music is playing
			set debug to {errMsg, errNum}

			set myError to {errMsg, errNum}
		end try
	end tell
end if

log state
if state is "playing" then
	log applicationName
	log trackname
	log artistname
	-- log playerposition
	-- log trackduration
	log myError

	-- log debug
end if
