import React from 'react'

const EditShiftRequest = () => {
  return (
    <>
    <Card className="p-0 mx-0 rounded-none shadow-none mt-[63px] w-full">
        <CardContent className="m-0 flex justify-end items-center p-3">
            <div className="flex justify-end items-center">
                <div className="flex items-center justify-end gap-2">
                    <Link className="button" to="/master-settings/notes">
                        <Button className="bg-transparent hover:bg-transparent text-black border border-gray-400">Back</Button>
                    </Link>
                    <Button className="bg-primary-purpal hover:bg-primary-purpal" onClick={handleSaveClick}>
                        Save
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
    <div className="p-3" style={{ height: 'calc(100vh - 125px)' }}>
        <Card className="h-full overflow-card-scroll w-full m-0 overflow-auto">
            <CardContent className="m-0 p-2 max-h-full">
                <Form {...form}>
                    <form ref={formRef} onSubmit={form.handleSubmit(onSubmit, onError)} className="p-4 lg:ps-5">
                        <div className="grid gap-x-[3rem] gap-y-[1.75rem]">
                            <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem]">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                    placeholder="Title"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-x-[3rem] gap-y-[1.75rem] my-[1.75rem">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="shadow-none focus-visible:ring-transparent space-0 mt-0"
                                                    placeholder="Description"
                                                    {...field}
                                                    rows="6"
                                                ></Textarea>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
</>
  )
}

export default EditShiftRequest