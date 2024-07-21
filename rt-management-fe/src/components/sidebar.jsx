import { Link } from 'react-router-dom';
import { PanelsTopLeft, Package2, Users, House, HandCoins } from 'lucide-react';

const Sidebar = () => {
  const sideLink = [
    {
      id: 1,
      to: '/dashboard',
      url: <PanelsTopLeft className="h-4 w-4" />,
      name: 'Dashboard',
    },
    {
      id: 2,
      to: '/penghuni',
      url: <Users className="h-4 w-4" />,
      name: 'Penghuni',
    },
    {
      id: 3,
      to: '/rumah',
      url: <House className="h-4 w-4" />,
      name: 'Rumah',
    },
    {
      id: 4,
      to: '/pembayaran',
      url: <HandCoins className="h-4 w-4" />,
      name: 'Pembayaran',
    },
  ];
  return (
    <div className="hidden border-r bg-muted/40 md:block bg-slate-900">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-8 w-7 text-white " />
            <span className="text-white text-xl">RT Management</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-xl font-medium lg:px-4 mt-5 space-y-2">
            {sideLink.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="flex items-center gap-3 text-white rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-slate-500"
              >
                {item.url}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
