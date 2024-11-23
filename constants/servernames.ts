import { SERVER_NAMES, SUB_OR_DUB } from "@/types";
import { StreamingServers } from '@consumet/extensions';

const servers: SERVER_NAMES = {
  VIDSTREAMING_SUB: {
    id: "VIDSTREAMING_SUB",
    name: "VidStreaming",
    serverDefinition: StreamingServers.VidStreaming,
    typeName: "Sub",
    SUB_OR_DUB: SUB_OR_DUB.SUB,
    available: true,
  },
  VIDCLOUD_SUB: {
    id: "VIDCLOUD_SUB",
    serverDefinition: StreamingServers.VidCloud,
    name: "Vidcloud",
    typeName: "Sub",
    SUB_OR_DUB: SUB_OR_DUB.SUB,
    available: true,
  },
  VIDSTREAMING_DUB: {
    id: "VIDSTREAMING_DUB",
    name: "VidStreaming",
    serverDefinition: StreamingServers.VidStreaming,
    typeName: "Dub",
    SUB_OR_DUB: SUB_OR_DUB.DUB,
    available: true,
  },
  VIDCLOUD_DUB: {
    id: "VIDCLOUD_DUB",
    name: "Vidcloud",
    serverDefinition: StreamingServers.VidCloud,
    typeName: "Dub",
    SUB_OR_DUB: SUB_OR_DUB.DUB,
    available: true,
  },
};

export default servers;
