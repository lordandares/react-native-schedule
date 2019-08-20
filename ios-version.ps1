$PROJECT_DIR="mobile/ios/Next"
$INFOPLIST_FILE="Info.plist"
$INFOPLIST_DIR="$PROJECT_DIR/$INFOPLIST_FILE"
$STARTDATE = "12/21/2017"


$rawbuildNumber = $env:BUILD_BUILDNUMBER

if($rawbuildNumber)
{
    $buildNumber=$rawbuildNumber.split(".")[1]
    $rawDate = $rawbuildNumber.split(".")[0]
    $today = $rawDate.substring(0,4) + "-" + $rawDate.substring(4, 2) + "-" + $rawDate.substring(6, 2)
}
else {
    $buildNumber = 1
    $today = get-date
}

$TimeSpan = [DateTime]$today - [DateTime]$STARTDATE;

$dateDiff = [Int]$TimeSpan.TotalDays

$version="1.0.$dateDiff"

$vercode="$dateDiff$buildNumber"

write-output "version is $version"

write-output "vercode is $vercode"


# Update plist with new values
& "/usr/libexec/PlistBuddy" "-c" "Set :CFBundleShortVersionString $version" "$INFOPLIST_DIR"
& "/usr/libexec/PlistBuddy" "-c" "Set :CFBundleVersion $vercode" "$INFOPLIST_DIR"

$vercode | Set-Content buildNumber.txt
