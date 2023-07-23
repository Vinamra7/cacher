param(
  [string]$countOfServers
)
az login --service-principal --username "eacfad3e-a728-4059-aa2d-2b4f7319776e" --password "2Rh8Q~f57ujrRdNsLuDBdkn~zguPQHFEsvNPXc26" --tenant "12b4fbf9-dea8-4490-bede-9cc40309ad61"
az vm create --resource-group "test-project_group" `
  --name "test-project$countOfServers" `
  --image "UbuntuLTS" `
  --admin-username "test-project" `
  --admin-password "aA1123456789" `
  --size "Standard_B1s" `
  --location "centralindia"