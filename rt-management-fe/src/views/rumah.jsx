import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { PlusCircle, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Rumah = () => {
  const [data, setData] = useState([]);
  const [penghuniOptions, setPenghuniOptions] = useState([]);
  const [selectedPenghuni, setSelectedPenghuni] = useState('null');
  const [statusRumah, setStatusRumah] = useState('kosong');
  const [editData, setEditData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get('/rumah/get-all-rumah');
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPenghuniOptions = async () => {
    try {
      const [penghuniResponse, rumahResponse] = await Promise.all([
        axios.get('/penghuni/get-all-penghuni'),
        axios.get('/rumah/get-all-rumah'),
      ]);

      const penghuniData = penghuniResponse.data.data;
      const rumahData = rumahResponse.data.data;

      const penghuniDenganRumah = new Set(
        rumahData
          .filter((rumah) => rumah.id_penghuni)
          .map((rumah) => rumah.id_penghuni)
      );
      const penghuniBelumPunyaRumah = penghuniData.filter(
        (penghuni) => !penghuniDenganRumah.has(penghuni.id)
      );

      setPenghuniOptions(penghuniBelumPunyaRumah);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRumah = async (event) => {
    event.preventDefault();
    try {
      const rumahData = {
        id_penghuni: selectedPenghuni === 'null' ? null : selectedPenghuni,
        status_rumah: selectedPenghuni === 'null' ? 'kosong' : 'dihuni',
      };

      await axios.post('/rumah/create-rumah', rumahData);

      getData();
      setSelectedPenghuni('null');
      setStatusRumah('kosong');
    } catch (error) {
      console.log('Error adding rumah:', error);
    }
  };

  const handleEditRumah = (rumah) => {
    setEditData(rumah);
    setSelectedPenghuni(rumah.id_penghuni ? rumah.id_penghuni : 'null');
  };

  const handleUpdateRumah = async (event) => {
    event.preventDefault();
    try {
      const updatedRumah = {
        id_penghuni: selectedPenghuni === 'null' ? null : selectedPenghuni,
        status_rumah: selectedPenghuni === 'null' ? 'kosong' : 'dihuni',
      };

      await axios.put(`/rumah/update-rumah/${editData.id}`, updatedRumah);

      getData();
      setEditData(null);
      setSelectedPenghuni('null');
    } catch (error) {
      console.log('Error updating rumah:', error);
    }
  };

  useEffect(() => {
    getData();
    getPenghuniOptions();
  }, []);

  return (
    <div>
      <Card>
        <div className="flex items-center">
          <CardHeader>
            <CardTitle>Rumah</CardTitle>
            <CardDescription>Manage your Rumah and view data.</CardDescription>
          </CardHeader>
          <div className="ml-auto flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-10 gap-1 bg-blue-700">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Tambah Rumah
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah Rumah</DialogTitle>
                  <DialogDescription>Tambah Data Rumah.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddRumah}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nama_lengkap" className="text-right">
                        Nama Penghuni
                      </Label>
                      <Select
                        id="nama_penghuni"
                        value={selectedPenghuni}
                        onValueChange={(value) => setSelectedPenghuni(value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih Penghuni" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Nama Penghuni</SelectLabel>
                            <SelectItem value="null">Kosongkan</SelectItem>
                            {penghuniOptions.map((penghuni, index) => (
                              <SelectItem key={index} value={penghuni.id}>
                                {penghuni.nama_lengkap}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status_rumah" className="text-right">
                        Status Rumah
                      </Label>
                      <Select
                        id="status_rumah"
                        value={statusRumah}
                        onValueChange={(value) => setStatusRumah(value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status Rumah</SelectLabel>
                            <SelectItem value="kosong">Kosong</SelectItem>
                            <SelectItem value="dihuni">Dihuni</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-blue-700">
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  No
                </TableHead>
                <TableHead>Nama Penghuni</TableHead>
                <TableHead>Status Rumah</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.penghuni ? (
                        item.penghuni.nama_lengkap
                      ) : (
                        <span className="text-red-500">Tidak Ada</span>
                      )}
                    </TableCell>
                    <TableCell>{item.status_rumah}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="h-10 gap-1 bg-green-700"
                            onClick={() => handleEditRumah(item)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Edit
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Rumah</DialogTitle>
                            <DialogDescription>
                              Edit Data Rumah.
                            </DialogDescription>
                          </DialogHeader>
                          {editData && (
                            <form onSubmit={handleUpdateRumah}>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit_nama_penghuni"
                                    className="text-right"
                                  >
                                    Nama Penghuni
                                  </Label>
                                  <Select
                                    id="edit_nama_penghuni"
                                    value={selectedPenghuni}
                                    onValueChange={(value) =>
                                      setSelectedPenghuni(value)
                                    }
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Pilih Penghuni" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Nama Penghuni</SelectLabel>
                                        <SelectItem value="null">
                                          Kosongkan
                                        </SelectItem>
                                        {penghuniOptions.map((penghuni) => (
                                          <SelectItem
                                            key={penghuni.id}
                                            value={penghuni.id}
                                          >
                                            {penghuni.nama_lengkap}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="edit_status_rumah"
                                    className="text-right"
                                  >
                                    Status Rumah
                                  </Label>
                                  <Select
                                    id="edit_status_rumah"
                                    value={statusRumah}
                                    onValueChange={(value) =>
                                      setStatusRumah(value)
                                    }
                                    disabled={selectedPenghuni !== 'null'}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Status Rumah</SelectLabel>
                                        <SelectItem value="kosong">
                                          Kosong
                                        </SelectItem>
                                        <SelectItem value="dihuni">
                                          Dihuni
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" className="bg-blue-700">
                                  Save
                                </Button>
                              </DialogFooter>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Rumah;
