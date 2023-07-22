const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const { ComputeManagementClient } = require("@azure/arm-compute");

// const clientId = "eacfad3e-a728-4059-aa2d-2b4f7319776e";
// const tenantId = "12b4fbf9-dea8-4490-bede-9cc40309ad61";
// const secret = "2Rh8Q~f57ujrRdNsLuDBdkn~zguPQHFEsvNPXc26";
// const subscriptionId = "9ec5dfe7-ab9e-4f9b-ade0-ffb59f14777a";
// const resourceGroupName = "test-project_group";
// const adminUsername = "test-project";
// const adminPassword = "aA1123456789";
// const vmName = "test-project2";
// const vmSize = "Standard_B1s";
const increaseCachingCapacityController = async (req, res) => {
  const subscriptionId = "9ec5dfe7-ab9e-4f9b-ade0-ffb59f14777a";

  const resourceGroupName = "test-project_group";

  const vmName = "test-project2";

  const clientId = "eacfad3e-a728-4059-aa2d-2b4f7319776e";

  const tenantId = "12b4fbf9-dea8-4490-bede-9cc40309ad61";

  const secret = "QiU8Q~rytIqSN_ZSN-43sztOf6LMB5QACnQ9Db_t";

  const credential = await msRestNodeAuth.loginWithServicePrincipalSecret(
    clientId,

    secret,

    tenantId
  );

  const computeClient = new ComputeManagementClient(credential, subscriptionId);

  const vmParameters = {
    location: "centralindia",

    hardwareProfile: {
      vmSize: "Standard_B1s",
    },

    storageProfile: {
      imageReference: {
        sku: "20_04-lts-gen2",

        publisher: "canonical",

        version: "latest",

        offer: "0001-com-ubuntu-server-focal",
      },

      osDisk: {
        caching: "ReadWrite",

        managedDisk: {
          storageAccountType: "Standard_LRS",
        },
      },
    },

    osProfile: {
      adminUsername: "test-project",
      computerName: vmName,
      adminPassword: "aA1123456789",
    },

  };

  //

  console.log(`Creating virtual machine "${vmName}"...`);

  await computeClient.virtualMachines.beginCreateOrUpdate(
    resourceGroupName,

    vmName,

    vmParameters
  );

  console.log(`Virtual machine "${vmName}" created successfully.`);
};
module.exports = { increaseCachingCapacityController };
