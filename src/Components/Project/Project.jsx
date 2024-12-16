import {React,useState} from 'react'
;('use client')
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { z } from 'zod'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Textarea } from '@/components/ui/textarea'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const Project = () => {
   
    const frameworks = [
        {
            value: 'next.js',
            label: 'Next.js',
        },
        {
            value: 'sveltekit',
            label: 'SvelteKit',
        },
        {
            value: 'nuxt.js',
            label: 'Nuxt.js',
        },
        {
            value: 'remix',
            label: 'Remix',
        },
        {
            value: 'astro',
            label: 'Astro',
        },
    ];
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const form = useForm({
        resolver: zodResolver(),
        defaultValues: {
            username: '',
        },
    })

    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const addRow = () => {
        setRows([
            ...rows,
            {
              id: rows.length + 1,
              checkbox: false,
              select1: '',
              select2: '',
              input: '',
            },
          ]);
      };
    

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-primary-red">
                    Add New Project
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} className="">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4  ">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Project Name"
                                                {...field}
                                                className="bg-white"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lob_process"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LOB_Process</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select LOB_Process" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">
                                                    m@example.com
                                                </SelectItem>
                                                <SelectItem value="m@google.com">
                                                    m@google.com
                                                </SelectItem>
                                                <SelectItem value="m@support.com">
                                                    m@support.com
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="client"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Client</FormLabel>
                                        <div className="w-full">
                                            <Popover
                                                open={open}
                                                onOpenChange={setOpen}
                                                className="w-full"
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className="w-full justify-between"
                                                    >
                                                        {value
                                                            ? frameworks.find(
                                                                  (framework) =>
                                                                      framework.value ===
                                                                      value
                                                              )?.label
                                                            : 'Select framework...'}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className=" w-full p-0">
                                                    <Command className="w-full max-w-2xl min-w-full">
                                                        <CommandInput
                                                            placeholder="Search framework..."
                                                            className=" w-full"
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                No framework
                                                                found.
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {frameworks.map(
                                                                    (
                                                                        framework
                                                                    ) => (
                                                                        <CommandItem
                                                                            key={
                                                                                framework.value
                                                                            }
                                                                            value={
                                                                                framework.value
                                                                            }
                                                                            onSelect={(
                                                                                currentValue
                                                                            ) => {
                                                                                setValue(
                                                                                    currentValue ===
                                                                                        value
                                                                                        ? ''
                                                                                        : currentValue
                                                                                )
                                                                                setOpen(
                                                                                    false
                                                                                )
                                                                            }}
                                                                        >
                                                                            {
                                                                                framework.label
                                                                            }
                                                                            <Check
                                                                                className={cn(
                                                                                    'ml-auto',
                                                                                    value ===
                                                                                        framework.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0'
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">
                                                    m@example.com
                                                </SelectItem>
                                                <SelectItem value="m@google.com">
                                                    m@google.com
                                                </SelectItem>
                                                <SelectItem value="m@support.com">
                                                    m@support.com
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-3.5 mb-3.5">
                            <Card>
                                <Table>
                                    
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                Sr.No
                                            </TableHead>
                                            <TableHead>Enable</TableHead>
                                            <TableHead>Process</TableHead>
                                            <TableHead>Billing</TableHead>
                                            <TableHead>Rate</TableHead>
                                            <TableHead className="text-right">
                                                <Button
                                                    type="button"
                                                    className="bg-primary-grn"
                                                    onClick={addRow}
                                                >
                                                    Add Row
                                                </Button>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>1</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        className="bg-primary-grn"
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="process"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Process" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="m@example.com">
                                                                        m@example.com
                                                                    </SelectItem>
                                                                    <SelectItem value="m@google.com">
                                                                        m@google.com
                                                                    </SelectItem>
                                                                    <SelectItem value="m@support.com">
                                                                        m@support.com
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                               
                                                <FormField
                                                    control={form.control}
                                                    name="billing"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Billing" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="m@example.com">
                                                                        m@example.com
                                                                    </SelectItem>
                                                                    <SelectItem value="m@google.com">
                                                                        m@google.com
                                                                    </SelectItem>
                                                                    <SelectItem value="m@support.com">
                                                                        m@support.com
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                               
                                                <FormField
                                                    control={form.control}
                                                    name="rate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="rate"
                                                                    {...field}
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="project_lead"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Lead</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Project Lead" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">
                                                    m@example.com
                                                </SelectItem>
                                                <SelectItem value="m@google.com">
                                                    m@google.com
                                                </SelectItem>
                                                <SelectItem value="m@support.com">
                                                    m@support.com
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="head_count"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Head Count</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="head_count"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fte_deployed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>FTE Deployed</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="fte_deployed"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Comments</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="You can write your comments here"
                                        className="resize-none"
                                        row="1"
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        </div>
                        <div className="flex flex items-end justify-end mt-3.5">
                            <Button type="submit" className="bg-primary-blue">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Project
