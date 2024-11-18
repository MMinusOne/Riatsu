import {
  SERVER_NAME,
  ServerDisplayProps,
  ServerTableProps,
  SUB_OR_DUB,
} from "@/types";

export default function ServerDisplay(props: ServerDisplayProps) {
  const { selectedServer } = props;

  const servers = [SERVER_NAME.ZORO, SERVER_NAME.GOGO];

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
            name={SUB_OR_DUB.SUB}
            servers={servers}
            onServerSelect={() => {}}
            selectedServer={selectedServer}
          />
          <ServerTable
            name={SUB_OR_DUB.DUB}
            servers={servers}
            onServerSelect={() => {}}
            selectedServer={selectedServer}
          />
        </div>
      </div>
    </>
  );
}

function ServerTable(props: ServerTableProps) {
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
                  selectedServer === server ? "btn-primary" : "btn-ghost"
                }`}
              >
                {server}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
