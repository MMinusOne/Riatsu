export default function ServerDisplay(props) {
  const { selectedServer } = props;

  const servers = [
    {
      name: "Zoro",
      id: "zoro",
    },
    {
      name: "Gogo",
      id: "gogo",
    },
  ];
  
  return (
    <>
      <div className="flex bg-base-200 bg-opacity-20 backdrop-blur-lg mt-4 w-full h-40">
        <div className="bg-primary bg-opacity-30 backdrop-blur-2xl p-2 h-full aspect-square">
          <span className="flex flex-col justify-center items-center gap-4 w-full h-full font-normal text-center text-md">
            Note: If current server doesn't work please try other servers
            beside.
          </span>
        </div>
        <div className="flex flex-col w-full h-full">
          <ServerTable
            name="Sub"
            servers={servers}
            onServerSelect={() => {}}
            selectedServer={selectedServer}
          />
          <ServerTable
            name="Dub"
            servers={servers}
            onServerSelect={() => {}}
            selectedServer={selectedServer}
          />
        </div>
      </div>
    </>
  );
}

function ServerTable(props) {
  const { name, servers, selectedServer, onServerSelect } = props;
  return (
    <>
      <div className="flex w-full h-1/2">
        <div className="flex justify-center items-center backdrop-blur-2xl h-full aspect-square">
          {name}
        </div>
        <div className="flex items-center gap-4 p-8 w-full h-full">
          {servers.map((server) => {
            return (
              <button
                className={`rounded-full btn btn-sm ${
                  selectedServer === server.id ? "btn-primary" : "btn-ghost"
                }`}
              >
                {server.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
