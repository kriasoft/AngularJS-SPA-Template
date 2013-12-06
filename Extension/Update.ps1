function Get-ScriptDirectory
{
    Split-Path -parent $PSCommandPath
}

$targetDir = Join-Path (Get-ScriptDirectory) "AngularJS"
$targetZip = Join-Path (Get-ScriptDirectory) "Output\ProjectTemplates\CSharp\Web\1033\AngularJS.zip"
$sourceDir = Join-Path ([Environment]::GetFolderPath("MyDocuments")) "Visual Studio 2013\My Exported Templates\AngularJS SPA Template.zip"

if (Test-Path $targetDir)
{
    Remove-Item $targetDir -Recurse -Force
}

if (Test-Path $targetZip)
{
    Remove-Item $targetZip -Force
}

unzip -q $sourceDir -d $targetDir

foreach ($file in Get-ChildItem (Join-Path $targetDir "*.cs") -Recurse)
{
    (Get-Content $file.PSPath) |
        Foreach-Object {$_ -Replace "System\.\`$safeprojectname\`$", "System.Web"} |
        Foreach-Object {$_ -Replace "Copyright © 2013 Konstantin Tarkus, KriaSoft LLC. See LICENSE.txt", "Copyright © `$year`$ `$registeredorganization`$"} |
        Set-Content $file.PSPath
}

foreach ($file in Get-ChildItem (Join-Path $targetDir "*.config") -Recurse)
{
    (Get-Content $file.PSPath) |
        Foreach-Object {$_ -Replace "System\.\`$safeprojectname\`$", "System.Web"} |
        Set-Content $file.PSPath
}

(Get-Content (Join-Path $targetDir "Packages.config")) |
    Foreach-Object {$_ -Replace "\`$safeprojectname\`$", "Web"} |
    Set-Content (Join-Path $targetDir "Packages.config")

(Get-Content (Join-Path $targetDir "Scripts\vendor\angular.js")) |
    Foreach-Object {$_ -Replace "\`$safeprojectname\`$", "Web"} |
    Set-Content (Join-Path $targetDir "Scripts\vendor\angular.js")

(Get-Content (Join-Path $targetDir "Scripts\vendor\angular-scenario.js")) |
    Foreach-Object {$_ -Replace "\`$safeprojectname\`$", "Web"} |
    Set-Content (Join-Path $targetDir "Scripts\vendor\angular-scenario.js")

(Get-Content (Join-Path $targetDir "Properties\AssemblyInfo.cs")) |
    Foreach-Object {$_ -Replace "\`$safeprojectname\`$ Application", "Web Application"} |
    Set-Content (Join-Path $targetDir "Properties\AssemblyInfo.cs")

(Get-Content (Join-Path $targetDir "Web.csproj")) |
    Foreach-Object {$_ -Replace ">\`$safeprojectname\`$", ">App.`$safeprojectname`$"} |
    Foreach-Object {$_ -Replace "47030", "8080"} |
    Set-Content (Join-Path $targetDir "Web.csproj")

(Get-Content (Join-Path $targetDir "Properties\AssemblyInfo.cs")) |
    Foreach-Object {$_ -Replace "Web Application", "`$projectname`$"} |
    Foreach-Object {$_ -Replace "`"KriaSoft LLC`"", "`"`$registeredorganization`$`""} |
    Foreach-Object {$_ -Replace "Copyright © 2013 KriaSoft LLC", "Copyright © `$year`$ `$registeredorganization`$"} |
    Foreach-Object {$_ -Replace "AngularJS SPA Template", "`$projectname`$"} |
    Foreach-Object {$_ -Replace "d6c9f32d-5071-4272-88c5-14630cf08960", "`$guid1`$"} |
    Set-Content (Join-Path $targetDir "Properties\AssemblyInfo.cs")

Rename-Item -Path (Join-Path $targetDir "MyTemplate.vstemplate") -NewName (Join-Path $targetDir "Template.vstemplate")
Rename-Item -Path (Join-Path $targetDir "Web.csproj") -NewName (Join-Path $targetDir "Template.csproj")
Remove-Item (Join-Path $targetDir "__TemplateIcon.ico")
Copy-Item -Path (Join-Path (Get-ScriptDirectory) "icon.ico") -Destination (Join-Path $targetDir "Template.ico")
Copy-Item -Path (Join-Path (Get-ScriptDirectory) "preview.png") -Destination (Join-Path $targetDir "Template.png")

(Get-Content (Join-Path $targetDir "Template.vstemplate")) |
    #Foreach-Object {$_ -Replace "^<VSTemplate", "<?xml version=`"1.0`" encoding=`"utf-8`"?>`r`n<VSTemplate"} |
    Foreach-Object {$_ -Replace "Name>.*?<", "Name>AngularJS SPA Template<"} |
    Foreach-Object {$_ -Replace "Description>.*?<", "Description>Single-page web application (SPA) project template for Visual Studio built with AngularJS, Bootstrap, and ASP.NET.<"} |
    Foreach-Object {$_ -Replace "DefaultName>.*?<", "DefaultName>Web<"} |
    Foreach-Object {$_ -Replace "ProvideDefaultName>.*?<", "ProvideDefaultName>true<"} |
    Foreach-Object {$_ -Replace "<Project TargetFileName.*?>", "<Project TargetFileName=`"Template.csproj`" File=`"Template.csproj`" ReplaceParameters=`"true`">"} |
    Foreach-Object {$_ -Replace "<Icon>__TemplateIcon.ico<", "<Icon>Template.ico<"} |
    Set-Content (Join-Path $targetDir "Template.vstemplate")

# <TemplateGroupID>Web</TemplateGroupID>`r`n    <NumberOfParentCategoriesToRollUp>1</NumberOfParentCategoriesToRollUp>`r`n    <TemplateID>KriaSoft.CSharp.Web.AngularJS</TemplateID>`r`n    
[IO.File]::ReadAllText((Join-Path $targetDir "Template.vstemplate")) -Replace `
    "(?s)ProjectSubType>[\r\n\s]+</ProjectSubType>(.*)", "ProjectSubType>Web</ProjectSubType>`r`n    <RequiredFrameworkVersion>4.5</RequiredFrameworkVersion>`r`n    <PreviewImage>Template.png</PreviewImage>`$1" |
    Set-Content (Join-Path $targetDir "Template.vstemplate")
#[IO.File]::ReadAllText((Join-Path $targetDir "Template.vstemplate")) -Replace `
#    "(?s)<TemplateContent>(.*)", "<TemplateContent>`r`n    <CustomParameters>`r`n      <CustomParameter Name=`"`$language`$`" Value=`"CSharp`" />`r`n    </CustomParameters>`$1" |
#    Set-Content (Join-Path $targetDir "Template.vstemplate")
[IO.File]::ReadAllText((Join-Path $targetDir "Template.vstemplate")) -Replace `
    "(?s)</VSTemplate>(.*)", "  <WizardExtension>`r`n    <Assembly>NuGet.VisualStudio.Interop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a</Assembly>`r`n    <FullClassName>NuGet.VisualStudio.TemplateWizard</FullClassName>`r`n  </WizardExtension>`r`n</VSTemplate>`$1" |
    Set-Content (Join-Path $targetDir "Template.vstemplate")

(Get-Content (Join-Path $targetDir "Template.csproj")) |
    Foreach-Object {$_ -Replace "{E9A8D3B5-0525-416A-BC5F-07B7B373397F}", "`$guid1`$"} |
    Foreach-Object {$_ -Replace "v4\.5\.1", "v`$targetframeworkversion`$"} |
    Foreach-Object {$_ -Replace ">..\\..\\Packages\\", ">`$nugetpackagesfolder`$"} |
    Set-Content (Join-Path $targetDir "Template.csproj")

Rename-Item -Path (Join-Path $targetDir "Template.vstemplate") -NewName (Join-Path $targetDir "Template.cshtml.vstemplate")

& "C:\Program Files\7-Zip\7z.exe" a -tzip -r "$targetZip" "$targetDir\*"