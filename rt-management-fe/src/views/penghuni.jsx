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
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Penghuni = () => {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    status_penghuni: '',
    nomor_telepon: '',
    sudah_menikah: false,
    foto_ktp: null,
  });
  const [editFormData, setEditFormData] = useState({
    id: null,
    nama_lengkap: '',
    status_penghuni: '',
    nomor_telepon: '',
    sudah_menikah: false,
    foto_ktp: '',
  });

  const getData = async () => {
    try {
      const response = await axios.get('/penghuni/get-all-penghuni');
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleEditChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('nama_lengkap', formData.nama_lengkap);
    form.append('status_penghuni', formData.status_penghuni);
    form.append('nomor_telepon', formData.nomor_telepon);
    form.append('sudah_menikah', formData.sudah_menikah);
    if (formData.foto_ktp) {
      form.append('foto_ktp', formData.foto_ktp);
    }

    try {
      await axios.post('/penghuni/create-penghuni', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        nama_lengkap: '',
        status_penghuni: '',
        nomor_telepon: '',
        sudah_menikah: false,
        foto_ktp: null,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('nama_lengkap', editFormData.nama_lengkap);
    form.append('status_penghuni', editFormData.status_penghuni);
    form.append('nomor_telepon', editFormData.nomor_telepon);
    form.append('sudah_menikah', editFormData.sudah_menikah);
    if (editFormData.foto_ktp) {
      form.append('foto_ktp', editFormData.foto_ktp);
    }

    try {
      await axios.put(`/penghuni/update-penghuni/${editFormData.id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditFormData({
        id: null,
        nama_lengkap: '',
        status_penghuni: '',
        nomor_telepon: '',
        sudah_menikah: false,
        foto_ktp: '',
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (penghuni) => {
    setEditFormData({
      id: penghuni.id,
      nama_lengkap: penghuni.nama_lengkap,
      status_penghuni: penghuni.status_penghuni,
      nomor_telepon: penghuni.nomor_telepon,
      sudah_menikah: penghuni.sudah_menikah,
      foto_ktp: penghuni.foto_ktp,
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Card>
        <div className="flex items-center">
          <CardHeader>
            <CardTitle>Penghuni</CardTitle>
            <CardDescription>
              Manage your penghuni and view data.
            </CardDescription>
          </CardHeader>
          <div className="ml-auto flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-10 gap-1 bg-blue-700">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Tambah Penguni
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah Penguni</DialogTitle>
                  <DialogDescription>Tambah Data Penghuni.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nama_lengkap" className="text-right">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="nama_lengkap"
                        placeholder="Pedro Duarte"
                        value={formData.nama_lengkap}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status_penghuni" className="text-right">
                        Status Penghuni
                      </Label>
                      <Select
                        id="status_penghuni"
                        value={formData.status_penghuni}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            status_penghuni: value,
                          }))
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status Penghuni</SelectLabel>
                            <SelectItem value="tetap">Tetap</SelectItem>
                            <SelectItem value="kontrak">Kontrak</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="foto_ktp" className="text-right">
                        Foto KTP
                      </Label>
                      <Input
                        id="foto_ktp"
                        type="file"
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nomor_telepon" className="text-right">
                        Nomor Telepon
                      </Label>
                      <Input
                        id="nomor_telepon"
                        placeholder="08123456789"
                        value={formData.nomor_telepon}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sudah_menikah" className="text-right">
                        Status Menikah
                      </Label>
                      <div className="w-5 ml-3">
                        <Input
                          id="sudah_menikah"
                          type="checkbox"
                          checked={formData.sudah_menikah}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit" className="bg-blue-700">
                        Tambah
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
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Status Penghuni</TableHead>
                <TableHead>Foto KTP</TableHead>
                <TableHead>Sudah Menikah</TableHead>
                <TableHead>No Telepon</TableHead>
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
                      {item.nama_lengkap}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status_penghuni === 'tetap'
                            ? 'bg-green-700'
                            : 'bg-blue-700'
                        }
                      >
                        {item.status_penghuni === 'tetap' ? 'Tetap' : 'Kontrak'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <img src={item.foto_ktp} alt="" className="w-10 h-7" />
                    </TableCell>
                    <TableCell>
                      {item.sudah_menikah ? 'Menikah' : 'Single'}
                    </TableCell>
                    <TableCell>{item.nomor_telepon}</TableCell>

                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="h-10 gap-1 bg-green-700"
                            onClick={() => handleEditClick(item)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Edit
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Penguni</DialogTitle>
                            <DialogDescription>
                              Edit Data Penghuni.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="nama_lengkap"
                                  className="text-right"
                                >
                                  Nama Lengkap
                                </Label>
                                <Input
                                  id="nama_lengkap"
                                  placeholder="Pedro Duarte"
                                  value={editFormData.nama_lengkap}
                                  onChange={handleEditChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="status_penghuni"
                                  className="text-right"
                                >
                                  Status Penghuni
                                </Label>
                                <Select
                                  id="status_penghuni"
                                  value={editFormData.status_penghuni}
                                  onValueChange={(value) =>
                                    setEditFormData((prev) => ({
                                      ...prev,
                                      status_penghuni: value,
                                    }))
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Pilih Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Status Penghuni</SelectLabel>
                                      <SelectItem value="tetap">
                                        Tetap
                                      </SelectItem>
                                      <SelectItem value="kontrak">
                                        Kontrak
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="foto_ktp"
                                  className="text-right"
                                >
                                  Foto KTP
                                </Label>
                                <div className="col-span-3 flex flex-col">
                                  {editFormData.foto_ktp && (
                                    <img
                                      src={editFormData.foto_ktp}
                                      alt="Preview"
                                      className="w-24 h-16 object-cover mb-2"
                                    />
                                  )}
                                  <Input
                                    id="foto_ktp"
                                    type="file"
                                    onChange={handleEditChange}
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="nomor_telepon"
                                  className="text-right"
                                >
                                  Nomor Telepon
                                </Label>
                                <Input
                                  id="nomor_telepon"
                                  placeholder="08123456789"
                                  value={editFormData.nomor_telepon}
                                  onChange={handleEditChange}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="sudah_menikah"
                                  className="text-right"
                                >
                                  Status Menikah
                                </Label>
                                <div className="w-5 ml-3">
                                  <Input
                                    id="sudah_menikah"
                                    type="checkbox"
                                    checked={editFormData.sudah_menikah}
                                    onChange={handleEditChange}
                                  />
                                </div>
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

export default Penghuni;
