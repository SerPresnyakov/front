module.exports = () ->
  uploadRelease:
    command: "curl -k --user 'ser:123123' --upload-file release.tar.gz https://nexus.hb.vmc.loc/repository/acontext-front-release/TableAdmin.tar.gz"
