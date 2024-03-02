import { Card } from "@chakra-ui/card";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Badge, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { NextPage } from "next";
import { useState } from "react";

import { RouterOutput, trpc } from "@/utils/trpc";
import { usdFormat } from "@/utils/usdFormat";

const Table = ({ columns, data }: any) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    // sorting
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <VStack padding="4" gap="4">
        {table.getHeaderGroups().map(headerGroup => (
          <HStack key={headerGroup.id} gap={"8"} padding={"4"} paddingLeft={"6"} paddingRight={"6"}>
            {headerGroup.headers.map(header => (
              <Text key={header.id} width={header.getSize()} onClick={header.column.getToggleSortingHandler()}
                    cursor={"pointer"}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                {{
                  asc: " 🔼",
                  desc: " 🔽"
                }[header.column.getIsSorted() as string] ?? null}
              </Text>
            ))}
          </HStack>
        ))}
        {table.getRowModel().rows.map(row => (
          <Card key={row.id} padding="4">
            <HStack gap={"8"} padding={"4"} paddingLeft={"6"} paddingRight={"6"}>
              {row.getVisibleCells().map(cell => (
                <Text key={cell.id} width={cell.column.getSize()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Text>
              ))}
            </HStack>

          </Card>
        ))}
      </VStack>
    </div>
  );
};

const columnHelper = createColumnHelper<RouterOutput["cmc"]["latest"]>();

const PercentChange = ({ value }: { value: number }) => (
  <Flex>
    <Badge
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      justifyContent={"center"}
      padding={"0.5"}
      paddingLeft={"1"}
      paddingRight={"1"}
      gap={"0.5"}
      colorScheme={value > 0 ? "green" : "red"}>
      {value > 0 ? <TriangleUpIcon /> : <TriangleDownIcon />}
      <Text>{Math.abs(value).toFixed(2) + "%"}</Text>
    </Badge>
  </Flex>
);

const columns = [
  columnHelper.accessor("cmc_rank", {
    header: "#",
    cell: info => `#${info.getValue()}`,
    size: 20
  }),
  columnHelper.accessor("symbol", {
    header: "Name",
    cell: info => info.getValue(),
    size: 100
  }),
  columnHelper.accessor("quote.USD.price", {
    header: "Price",
    cell: info => <Text textAlign="right">{usdFormat.format(info.getValue())}</Text>,
    size: 100
  }),
  columnHelper.accessor("quote.USD.percent_change_24h", {
    header: "24h %",
    cell: info => <PercentChange value={info.getValue()} />,
    size: 70
  })
];

const Home: NextPage = () => {
  const { data } = trpc.cmc.latest.useQuery();
  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default Home;
