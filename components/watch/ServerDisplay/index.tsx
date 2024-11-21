import servers from "@/constants/servernames";
import { ServerDisplayProps, ServerTableProps, SUB_OR_DUB } from "@/types";

export default function ServerDisplay(props: ServerDisplayProps) {
  const { selectedServer, onServerSelect } = props;

  return (
    <>
      <div className="flex bg-base-200 bg-opacity-80 backdrop-blur-lg mt-4 w-full h-40">
        <div className="bg-primary bg-opacity-30 backdrop-blur-2xl p-2 h-full aspect-square">
          <span className="flex flex-col justify-center items-center gap-4 w-full h-full font-normal text-center text-md">
            Note: If the current server doesn't work, please try other servers
            nearby.
          </span>
        </div>
        <div className="flex flex-col w-full h-full">
          <ServerTable
            name={"Sub"}
            servers={Object.values(servers).filter(
              (e) => e.SUB_OR_DUB === SUB_OR_DUB.SUB
            )}
            onServerSelect={onServerSelect}
            selectedServer={selectedServer}
          />
          <ServerTable
            name={"Dub"}
            servers={Object.values(servers).filter(
              (e) => e.SUB_OR_DUB === SUB_OR_DUB.DUB
            )}
            onServerSelect={onServerSelect}
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
        <div className="flex justify-center items-center backdrop-blur-2xl h-full uppercase aspect-square">
          {name}
        </div>
        <div
          key="servers"
          className="flex items-center gap-4 p-8 w-full h-full"
        >
          {servers.map((server, serverIndex) => {
            return (
              <button
                key={serverIndex}
                onClick={() => {
                  onServerSelect(server);
                }}
                className={`rounded-full btn btn-sm ${
                  server.available ? "" : "disabled btn-disabled"
                } ${
                  selectedServer.id === server.id ? "btn-primary" : "btn-ghost"
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
