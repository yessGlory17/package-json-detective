import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { getPackageInfo, getPackageInfoBulk } from "../api/getPackageInfo";

const useStyles = makeStyles({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function Editor() {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [packages, setPackages] = useState<any | null>(null);

    useEffect(() => {
        const get = async () => {
            const t = await getPackageInfo('@mui/material', '5.11.9');
            console.log('data: ', t);
            setData(t);
        }
        get()
    }, []);

    useEffect(() => {
        const getAll = async () => {
            if (packages !== null) {
                const r = await getPackageInfoBulk(packages);
                console.log('all packages: ', r);
            }

        }
        getAll();
    }, [packages])



    const getFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            console.log('file selected');
            console.log('file:', event.target.files?.[0]);
            const file = event?.target?.files?.[0];
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                console.log('file readed...');
                const json = JSON.parse(event?.target?.result as string);
                console.log('result: ', json);
                const packageNames = Object.keys(json?.dependencies);
                const packageVersions = Object.values(json?.dependencies);
                console.log('package Names: ', packageNames);
                console.log('packageVersions: ', packageVersions);
                const p = packageNames?.map((name, index) => ({ name, version: String(packageVersions[index]).replace('^', '').replace('~', '') }))
                console.log('p:', p);
                if (p != null) {
                    setPackages(p);
                }
            }

            reader.readAsText(file);
        }
    }

    return (
        <Box className={classes.root}>
            <Button variant="contained" component="label">Upload Package.json <input onChange={getFile} type='file' accept=".json" hidden /></Button>
        </Box>
    )
}

export default Editor;