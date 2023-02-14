async function getPackageInfo(name: string, version: string) {
    const endpoint = `https://registry.npmjs.org/${name}/${version}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
}

export type NpmPackage = {
    name: string;
    version?: string;
}

type PackageRequestParams = NpmPackage[];

async function getPackageInfoBulk(packages: PackageRequestParams) {
    return await Promise.all(packages.map(p =>
        fetch(p.version ?
            `https://registry.npmjs.cf/${p.name}/${p.version}`
            : `https://registry.npmjs.cf/${p.name}`)))
}

export {
    getPackageInfo,
    getPackageInfoBulk
};