import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DashboardPage() {
  const mockData = [
    {
      imgUrl: "https://picsum.photos/id/9/5000/3269",
      title: "Macbook",
      quantity: "1",
      location: "Office",
    },
    {
      imgUrl: "https://picsum.photos/id/23/3887/4899",
      title: "Forks",
      quantity: "14",
      location: "Kitchen",
    },
    {
      imgUrl: "https://picsum.photos/id/30/1280/901",
      title: "Coffee mug",
      quantity: "4",
      location: "Kitchen",
    },
  ];

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-6">Welcome, John</h1>

      <section className="mb-8">
        <h2 className="font-semibold text-3xl mb-4">Stats</h2>
        <div className="grid grid-cols-4 gap-4">
          <article className="bg-secondary p-4 rounded-md text-center">
            <h3 className="font tracking-wider text-muted-foreground mb-1">Total assets</h3>
            <p className="font-bold text-primary text-3xl">24</p>
          </article>
          <article className="bg-secondary p-4 rounded-md text-center">
            <h3 className="font tracking-wider text-muted-foreground mb-1">Total locations</h3>
            <p className="font-bold text-primary text-3xl">8</p>
          </article>
          <article className="bg-secondary p-4 rounded-md text-center">
            <h3 className="font tracking-wider text-muted-foreground mb-1">Total users</h3>
            <p className="font-bold text-primary text-3xl">2</p>
          </article>
          <article className="bg-secondary p-4 rounded-md text-center">
            <h3 className="font tracking-wider text-muted-foreground mb-1">Total owners</h3>
            <p className="font-bold text-primary text-3xl">6</p>
          </article>
        </div>
      </section>

      <hr className="mb-8" />

      <section>
        <h2 className="font-semibold text-3xl mb-4">Assets</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.imgUrl}>
                <TableCell>
                  <img className="aspect-square object-cover w-[75px]" src={item.imgUrl} />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
