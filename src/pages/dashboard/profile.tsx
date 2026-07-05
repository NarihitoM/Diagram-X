import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/store/authstore";
import { Building, Edit, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useUpdate } from "@/store/updatestore";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export const Profile = () => {
    const { username, profileurl, useremail, userid, bio: biosetter, town: townsetter, phone: phonesetter } = useAuth();

    const [bio, setbio] = useState<string>("")
    const [town, settown] = useState<string>("")
    const [phone, setphone] = useState<string>("")

    const { userupdate, updateloading } = useUpdate();

    const submit = async () => {
        try {
            const result = await userupdate(userid ?? "", bio, town, phone);
            if (result.success) {
                toast.success(result.message);
            }
            if (!result.success) {
                toast.error(result.message);
            }
        }
        catch (err: any) {
            toast.error(err?.response?.data.message || "It seems something went wrong.")
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-7">

                <h1 className="text-3xl font-bold mb-8 "><span className="text-cyan-500">P</span>rofile Settings</h1>

                <div className="flex items-center gap-8 mb-5">
                    <div className="relative">
                        <Avatar className="w-25 h-25 shadow-[0_0_10px_0_rgba(0,191,255,0.5)] max-md:w-20 max-md:h-20">
                            <AvatarImage src={profileurl || undefined} className="rounded-full" />
                            <AvatarFallback className="bg-cyan-500  text-white dark:text-white">
                                <span className="text-[35px]">{username?.substring(0, 1).toUpperCase()}</span>
                            </AvatarFallback>
                        </Avatar>
                        <Button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-700 text-white p-2 rounded-full">
                            <Edit className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-2xl font-semibold">{username}</h2>
                        <p className="text-gray-500">{useremail}</p>
                        <div className="flex gap-2 items-center">
                            <Building className="size-5 text-cyan-500"/>
                            <p className="text-gray-500 text-sm">{townsetter ?? "Town"}</p>
                        </div> 
                         <div className="flex gap-2 items-center">
                            <Phone className="size-5 text-cyan-500"/>
                            <p className="text-gray-500 text-sm">{phonesetter ?? "Phone"}</p>
                        </div> 
                    </div>
                </div>
                <div className="w-full">
                    <Label className="block text-sm font-medium mb-2">Bio</Label>
                    <div
                        className="w-full h-25 rounded-lg px-4 py-2 focus:ring-2 shadow-sm focus:ring-cyan-500 outline-none"
                    >
                        <p className="text-gray-600">{biosetter ?? "Hello Nice To Meet You!"}</p>
                    </div>
                </div>

                <div className="flex flex-col w-full mt-5">
                    <Tabs defaultValue="userinfo" >
                        <TabsList>
                            <TabsTrigger value="userinfo">Userinfo</TabsTrigger>
                            <TabsTrigger value="userdetails">UserDetails</TabsTrigger>
                        </TabsList>
                        <TabsContent value="userinfo" className="flex flex-col gap-5 mt-5">
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Username
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder={username ?? ""}
                                    disabled
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Email Address
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder={useremail ?? ""}
                                    disabled
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="userdetails" className="flex flex-col gap-5 mt-5">
                            <div>
                                <Label className="block text-sm font-medium mb-2">
                                    Bio
                                </Label>
                                <Textarea
                                    placeholder={biosetter ?? "Enter your bio"}
                                    name="bio"
                                    value={bio}
                                    onChange={(e) => setbio(e.target.value)}
                                    className="w-full resize-none   border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="w-full">
                                    <Label className="block text-sm font-medium mb-2">
                                        Town
                                    </Label>
                                    <Input
                                    placeholder={townsetter ?? "Enter your town"}
                                        type="text"
                                        name="town"
                                        value={town}
                                        onChange={(e) => settown(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    />
                                </div>
                                <div className="w-full">
                                    <Label className="block text-sm font-medium mb-2">
                                        Phone
                                    </Label>
                                    <Input
                                    placeholder={phonesetter ?? "Enter your phone no"}
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setphone(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none"
                                    />
                                </div>
                            </div>

                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex justify-end mt-10">
                    <Button className="w-30 bg-cyan-500 text-white rounded-xl hover:bg-cyan-700 transition" disabled={updateloading} onClick={submit}>
                        {updateloading ? <Spinner/> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};