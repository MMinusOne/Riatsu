import { SERVER_NAMES, SUB_OR_DUB } from "@/types";

const servers: SERVER_NAMES = {
  ZORO_SUB: {
    id: "ZORO_SUB",
    name: "Zoro",
    typeName: "Sub",
    SUB_OR_DUB: SUB_OR_DUB.SUB,
    available: true,
  },
  GOGO_SUB: {
    id: "GOGO_SUB",
    name: "Gogo",
    typeName: "Sub",
    SUB_OR_DUB: SUB_OR_DUB.SUB,
    available: false,
  },
  ZORO_DUB: {
    id: "ZORO_DUB",
    name: "Zoro",
    typeName: "Dub",
    SUB_OR_DUB: SUB_OR_DUB.DUB,
    available: true,
  },
  GOGO_DUB: {
    id: "GOGO_DUB",
    name: "Gogo",
    typeName: "Dub",
    SUB_OR_DUB: SUB_OR_DUB.DUB,
    available: false,
  },
};

export default servers;
