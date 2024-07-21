import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const Navbar = () => {
  return (
    <div>
      <header className="flex h-14 bg-slate-900 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Avatar className="ml-auto">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
    </div>
  );
};

export default Navbar;
