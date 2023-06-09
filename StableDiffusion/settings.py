payload = {
    "prompt": "cirno",
    "steps": 20
}

override_settings = {}
override_settings["filter_nsfw"] = "true"
override_settings["CLIP_stop_at_last_layers"] = 2

override_payload = {
                "override_settings": override_settings
            }
payload.update(override_payload)

print(payload)