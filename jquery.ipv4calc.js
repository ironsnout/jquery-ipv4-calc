
	
	function validate(fieldID,fieldValue,type="none"){
	
		var res = /^[0-9]+$/g.test(fieldValue);
	
		if(!res){
			return false;
		}else{
			if(type == "netmask")
			{
				if(fieldValue >	32){
					return false;	
				}else{
					return true;	
				}
			}
			else
			{	
				if(fieldValue >	255){
					return false;	
				}else{
					return true;	
				}
			}		
		}	
	}
	
	function decTobin(number){
		
		var result = Math.floor(number / 2);
		var mod = String(number % 2);
		
		while(result != 0){
			mod = String(result % 2)+mod
			result = Math.floor(result / 2);
		}	
		
		while(mod.length != 8){
			mod = "0"+mod	
		}
		
		return mod;
	}
	
	function binTodec(binary){
		
		//reverse binay string
		binary = binary.split("").reverse().join("");
		decimal = 0;
		
		for(i=0;i<binary.length;i++)
		{
			if(binary[i] == 1)
			{
				decimal = decimal + Math.pow(2,i)
			}	
		}
		
		return decimal;
	}
	
	function dottedDecToBin(dottedDec){
		
		dottedArray = dottedDec.split(".");
		finalres = "";
		for (var i = 0; i < dottedArray.length; i++) {
			if(i < dottedArray.length -1){
				finalres = finalres+decTobin(dottedArray[i])+".";
			}else{
				finalres = finalres+decTobin(dottedArray[i]);
			}	
		}
		
		return finalres
	}	
	
	function dottedBinToDec(dottedBin){
		
		dottedArray = dottedBin.split(".");
		finalres = "";
		for (var i = 0; i < dottedArray.length; i++) {
			if(i < dottedArray.length -1){
				finalres = finalres+binTodec(dottedArray[i])+".";
			}else{
				finalres = finalres+binTodec(dottedArray[i]);
			}	
		}
		
		return finalres
	}	
	
	function getNetMaskBin(net){
		//get netmask in dotted binary format
		var valuedOne = net;
		var netmaskbin = "";
	
		while(netmaskbin.length < 32){
				
			if(valuedOne > 0){	
				netmaskbin = netmaskbin+"1"
			}else{
				netmaskbin = netmaskbin+"0"
			}
			valuedOne = valuedOne -1;
		}
		
		return netmaskbin
	}
	
	function getBroadcast(netbinary,netmask){
		var broadcast = "";
		for(i=0;i<netbinary.length;i++)
		{
			if(i < (32-(32-netmask))){
				broadcast = broadcast+netbinary[i];
			}else{
				broadcast = broadcast+"1";	
			}
		}	
		return broadcast;
	}	
	
	function getFirstHost(netbinary,netmask){
		var firsthost = "";
		for(i=0;i<netbinary.length;i++)
		{
			if(i < (32-(32-netmask))){
				firsthost = firsthost+netbinary[i];
			}else{
				if(i == netbinary.length-1){
					firsthost = firsthost+"1";
				}else{
					firsthost = firsthost+"0";	
				}	
			}
		}	
		return firsthost;
	}
	
	function getLastHost(netbinary,netmask){
		var lasthost = "";
		for(i=0;i<netbinary.length;i++)
		{
			if(i < (32-(32-netmask))){
				lasthost = lasthost+netbinary[i];
			}else{
				if(i == netbinary.length-1){
					lasthost = lasthost+"0";
				}else{
					lasthost = lasthost+"1";	
				}	
			}
		}	
		return lasthost;
	}
	
	function addDots(binaryString){
		
		var newString = "";
		
		for(i=0;i<binaryString.length;i++)
		{
			if(i == 8 || i == 16 || i == 24)
			{
				newString = newString+"."
			}	
			
			newString = newString+binaryString[i]
		}
	
		return newString
	}
	
	function removeDots(string){
		string = string.replace(/\./g,'');
		return string
	}
	
	function andOperation(a,b){
		
		var resultString = "";
		
		for(i=0;i<32;i++)
		{
			if(a[i] == "1" && b[i] == "1")
			{
				resultString = resultString+"1";
			}
			else
			{
				resultString = resultString+"0";
			}		
		}
		
		return resultString;
	}
	
	function checkNetClass(netbin){
		
		if(netbin.charAt(0) == '0'){
			//networks belongs to class A	
			return "A";	
		}
		else{
			if(netbin.charAt(1) == '0'){
				//networks belongs to class B	
				return "B";	
			}
			else{
				if(netbin.charAt(2) == '0'){
					//networks belongs to class C	
					return "C";	
				}
				else{
					if(netbin.charAt(3) == '0'){
						//networks belongs to class B	
						return "D";	
					}
					else{
						//networks belongs to class E	
						return "E";	
					}
				}	
			}	
		}		
	}
	
	function formatDotBin(netdotbin,ipclass="None",sub1="None",sub2="None"){
		
		var p1 = "";
		var p2 = "";
		var formatted = "";
		
		//search subnet
		if(sub1 != "None" && sub2 != "None")
		{
			var count = addDots(removeDots(netdotbin).substr(0,sub1)).match(/\./g);
			
			if(count == null)
			{
				countlen = 0;	
			}
			else
			{
				countlen = count.length;
			}		
			var toins = "<span class=\"bold\">";
			var toins2 = "</span>";

			if(netdotbin[parseInt(sub1)+parseInt(countlen)] == ".")
			{
				var index = parseInt(sub1)+parseInt(countlen)+1;
			}
			else
			{
				var index = parseInt(sub1)+parseInt(countlen);
			}		
			
			formatted = [netdotbin.slice(0,index),toins,netdotbin.slice(index)].join('');
			
			var index2 = formatted.indexOf(toins)+(toins.length);
			
			var counter1 = 1;
			var counter2 = 0;
			while(counter1<=(parseInt(sub2)-parseInt(sub1))){
			
				if(formatted.charAt(index2+counter2) != "."){	
					counter1++;
				}
				counter2++;
			}
			
			var index3 = formatted.indexOf(toins)+(toins.length)+counter2;
			formatted = [formatted.slice(0,index3),toins2,formatted.slice(index3)].join('');
			
			netdotbin = formatted;
		}
		
		//search net class
		if(ipclass != "None")
		{
			var s1;
			var s2
			
			switch(ipclass){
				case "A":
					s1 = 0;
					s2 = 1;
					break;
				case "B":
					s1 = 0;
					s2 = 2;
					break;
				case "C":
					s1 = 0;
					s2 = 3;
					break;
				case "D":
					s1 = 0;
					s2 = 4;
					break;
				case "E":
					s1 = 0;
					s2 = 5;
					break;
				default:				
					s1 = 0;
					s2 = 1;
			}	
			
			p1 = netdotbin.substring(s1,s2);
			while(p1.match(/</g))
			{
				s2 = s2 - 1;
				p1 = netdotbin.substring(s1,s2);
			}	
			p2 = netdotbin.substring(s2);
			formatted = "<span class=\"bunt_3 bold\">"+p1+"</span>"+p2
		}
			
		return formatted		
	}
	
	function checkRFC1918(network){
		
		var networkArray = network.split(".");
		var p1 = parseInt(networkArray[0]);
		var p2 = parseInt(networkArray[1]);
		
		if(p1 == 10)
		{
			return true;
		}
		else if (p1 == 192)
		{
			if(p2 == 168)
			{
				return true;	
			}	
			else
			{
				return false;	
			}	
		}
		else if (p1 == 172)
		{
			if(16 <= p2 <= 31)
			{
				return true;	
			}	
			else
			{
				return false;	
			}
		}			
		else
		{
			return false;	
		}	
	}	
	
	function getMainNetwork(address,netmask){
	
		var addressdotbin = dottedDecToBin(address);					//user's entry in dotted binary format
		var addressbin = removeDots(addressdotbin);						//user's entry in binary format
	
		var netclass = checkNetClass(addressbin);						//define netowrk class
		
		//define netmask and netmask wild card in dotted binary and dotted decimal formats
		var netmaskbin = getNetMaskBin(netmask);
		var netmaskdotbin = addDots(netmaskbin);
		var netmaskdotdec = String(binTodec(netmaskdotbin.substring(0,8)))+"."+String(binTodec(netmaskdotbin.substring(9,17)))+"."+String(binTodec(netmaskdotbin.substring(18,26)))+"."+String(binTodec(netmaskdotbin.substring(27)));
		var netmaskdotwilddec = String(255-binTodec(netmaskdotbin.substring(0,8)))+"."+String(255-binTodec(netmaskdotbin.substring(9,17)))+"."+String(255-binTodec(netmaskdotbin.substring(18,26)))+"."+String(255-binTodec(netmaskdotbin.substring(27)));
		var netmaskdotwildbin = dottedDecToBin(netmaskdotwilddec);
	
		//define network address in dotted binary and in dotted decimal formats
		var networkbin = andOperation(addressbin,netmaskbin);
		var networkdotbin = addDots(networkbin);
		var networkdotdec = String(binTodec(networkdotbin.substring(0,8)))+"."+String(binTodec(networkdotbin.substring(9,17)))+"."+String(binTodec(networkdotbin.substring(18,26)))+"."+String(binTodec(networkdotbin.substring(27)));
		var networkdotwild = String(255-binTodec(networkdotbin.substring(0,8)))+"."+String(255-binTodec(networkdotbin.substring(9,17)))+"."+String(255-binTodec(networkdotbin.substring(18,26)))+"."+String(255-binTodec(networkdotbin.substring(27)));
	
		var hosts = Math.pow(2,(32-netmask)) - 2;						//total number of hosts
			
		var broadcastbin = getBroadcast(networkbin,netmask);			//network broadcast address in binary format
		var broadcastdotbin = addDots(broadcastbin);					//network broadcast address in dotted binary format
		var broadcastdotdec = dottedBinToDec(broadcastdotbin);			//network broadcast address in dotted decimal format
			
		var firsthostbin = getFirstHost(networkbin,netmask);			//first network host address in binary format
		var firsthostdotbin = addDots(firsthostbin);					//first network host address in dotted binary format
		var firsthostdotdec = dottedBinToDec(firsthostdotbin);			//first network host address in dotted decimal format
			
		var lasthostbin = getLastHost(networkbin,netmask);				//last network host address in binary format
		var lasthostdotbin = addDots(lasthostbin);						//last network host address in binary format
		var lasthostdotdec = dottedBinToDec(lasthostdotbin);			//last network host address in binary format
		
		var formatteddotbin = formatDotBin(networkdotbin,netclass);	
		
		var privateNet = "";
		if(checkRFC1918(address))
		{
			privateNet = " - private network"
		}
		
		//show main info tab
		$("#addrdec").text(address);
		$("#addrbin").text(addressdotbin);
		$("#maskdec").text(netmaskdotdec);
		$("#maskbin").text(netmaskdotbin);
		$("#wildmaskdec").text(netmaskdotwilddec);
		$("#wildmaskbin").text(netmaskdotwildbin);
		$("#netdec").text(networkdotdec+"/"+netmask);
		$("#netbin").html(formatteddotbin);
		$("#net_class").text("(Class "+netclass+privateNet+")");
		$("#brddec").text(broadcastdotdec);
		$("#brdbin").text(broadcastdotbin);
		$("#fhdec").text(firsthostdotdec);
		$("#fhbin").text(firsthostdotbin);
		$("#lhdec").text(lasthostdotdec);
		$("#lhbin").text(lasthostdotbin);
		$("#hosts").text(hosts);
		$("#main_info_title").show();
		$("#ipcalc_main_infos").show();
	
	}
	
	function getAllNetworks(address,netmask,newnetmask){
		
		$("#ipcalc_networks").html("");									//clear previous html code
		var addressdotbin = dottedDecToBin(address);					//user's entry in dotted binary format
		var addressbin = removeDots(addressdotbin);						//user's entry in binary format	
		var netmaskbin = getNetMaskBin(netmask);						//netmask in binary format
		var networkbin = andOperation(addressbin,netmaskbin);			//define network address in binary format
		var networkpart = networkbin.substring(0,netmask);	
		
		if(parseInt(netmask) > parseInt(newnetmask))
		{
			$("#ipcalc_networks").append("<p class=\"title\">Supernet</p>");
			var difference = netmask - newnetmask;
			var supernet_slice = "";
			
			for(var i=1;i<=difference;i++){
				supernet_slice = supernet_slice+"0";
			}
			
			var newnetmaskbin = getNetMaskBin(newnetmask);
			var newnetmaskdotbin = addDots(newnetmaskbin);
			var newnetmaskdotdec = String(binTodec(newnetmaskdotbin.substring(0,8)))+"."+String(binTodec(newnetmaskdotbin.substring(9,17)))+"."+String(binTodec(newnetmaskdotbin.substring(18,26)))+"."+String(binTodec(newnetmaskdotbin.substring(27)));
			var newnetmaskdotwilddec = String(255-binTodec(newnetmaskdotbin.substring(0,8)))+"."+String(255-binTodec(newnetmaskdotbin.substring(9,17)))+"."+String(255-binTodec(newnetmaskdotbin.substring(18,26)))+"."+String(255-binTodec(newnetmaskdotbin.substring(27)));
			var newnetmaskdotwildbin = dottedDecToBin(newnetmaskdotwilddec);
			
			//get supernet address in dotted binary and in dotted decimal formats
			var supernetbin = andOperation(addressbin,newnetmaskbin);
			var supernetdotbin = addDots(supernetbin);
			var supernetclass = checkNetClass(supernetbin);						//define network class
			var supernetdotdec = String(binTodec(supernetdotbin.substring(0,8)))+"."+String(binTodec(supernetdotbin.substring(9,17)))+"."+String(binTodec(supernetdotbin.substring(18,26)))+"."+String(binTodec(supernetdotbin.substring(27)));
			var supernetdotwild = String(255-binTodec(supernetdotbin.substring(0,8)))+"."+String(255-binTodec(supernetdotbin.substring(9,17)))+"."+String(255-binTodec(supernetdotbin.substring(18,26)))+"."+String(255-binTodec(supernetdotbin.substring(27)));
			
			var hosts = Math.pow(2,(32-newnetmask)) - 2;									//total number of hosts
			
			var supernetbroadcastbin = getBroadcast(supernetbin,newnetmask);				//supernet broadcast address in binary format
			var supernetbroadcastdotbin = addDots(supernetbroadcastbin);					//supernet broadcast address in dotted binary format
			var supernetbroadcastdotdec = dottedBinToDec(supernetbroadcastdotbin);			//supernet broadcast address in dotted decimal format
				
			var supernetfirsthostbin = getFirstHost(supernetbin,newnetmask);				//first supernet host address in binary format
			var supernetfirsthostdotbin = addDots(supernetfirsthostbin);						//first supernet host address in dotted binary format
			var supernetfirsthostdotdec = dottedBinToDec(supernetfirsthostdotbin);			//first supernet host address in dotted decimal format
					
			var supernetlasthostbin = getLastHost(supernetbin,newnetmask);					//last supernet host address in binary format
			var supernetlasthostdotbin = addDots(supernetlasthostbin);						//last supernet host address in binary format
			var supernetlasthostdotdec = dottedBinToDec(supernetlasthostdotbin);			//last supernet host address in binary format
			
			//print supernet info
			supernet_table = "<table class=\"supernet_info\"><tr><td class=\"label\">Netmask</td><td id=\"supernetmaskdec\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"supernetmaskbin\"></td></tr><tr><tr><td class=\"label\">Wildcard</td><td id=\"supernetwilddec\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"supernetwildbin\"></td></tr><tr><td class=\"label\">Network</td><td id=\"supernetnetdec\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"supernetnetbin\"></td><td id=\"supernet_class\" class=\"bunt_3\"></td></tr><tr><td class=\"label\">Broadcast</td><td id=\"supernetbroaddec\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"supernetbroadbin\"></td></tr><tr><td class=\"label\">First Host</td><td id=\"supernetfhdec\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"supernetfhbin\"></td></tr><tr><td class=\"label\">Last Host</td><td id=\"supernetlhdec\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"supernetlhbin\"></td></tr><tr><td class=\"label\">Hosts/Net</td><td class=\"bunt\" id=\"supernethostsdec\" colspan=\"2\"></td></tr></table>";
			$("#ipcalc_networks").append(supernet_table);
		
			var formattedsupernetdotbin = formatDotBin(supernetdotbin,supernetclass);	
			var privateNet = "";
			if(checkRFC1918(supernetdotdec))
			{
				privateNet = " - private network"
			}
			$("#supernetmaskdec").text(newnetmaskdotdec);
			$("#supernetmaskbin").text(newnetmaskdotbin);
			$("#supernetwilddec").text(newnetmaskdotwilddec);
			$("#supernetwildbin").text(newnetmaskdotwildbin);
			$("#supernetnetdec").text(supernetdotdec+"/"+newnetmask);
			$("#supernetnetbin").html(formattedsupernetdotbin);
			$("#supernet_class").text("(Class "+supernetclass+privateNet+")");
			$("#supernetbroaddec").text(supernetbroadcastdotdec);
			$("#supernetbroadbin").text(supernetbroadcastdotbin);
			$("#supernetfhdec").text(supernetfirsthostdotdec);
			$("#supernetfhbin").text(supernetfirsthostdotbin);
			$("#supernetlhdec").text(supernetlasthostdotdec);
			$("#supernetlhbin").text(supernetlasthostdotbin);
			$("#supernethostsdec").text(hosts);	
		}
		else
		{
			$("#ipcalc_networks").append("<p class=\"title\">Subnets</p>");
			var difference = newnetmask - netmask;
			var subnet_slice = "";
			var hosts_slice = "";
			var subnet_slice_dec = "";
			var subnetnetbin = "";
			var subnetnetdotbin = "";
			var subnetnetdotdec = "";
			var subnetbroadcastbin = "";
			var subnetbroadcastdotbin = "";
			var subnetbroadcastdotdec = "";
			var subnetfirsthostbin = "";
			var subnetfirsthostdotbin = "";
			var subnetfirsthostdotdec = "";
			var subnetlasthostbin = "";
			var subnetlasthostdotbin = "";
			var subnetlasthostdotdec = "";
			var subnet_table = "";
			var subnetclass = "";
			var max_subnet_limit = 100;
			
			
			for(var i=1;i<=difference;i++){
				subnet_slice = subnet_slice+"0";
			}
			
			for(var i=1;i<=32-newnetmask;i++){
				hosts_slice = hosts_slice+"0";
			}
			
			//subnets common infos
			var subnets = Math.pow(2,difference);
			var hosts = Math.pow(2,(32 - newnetmask)) - 2;
			var totalhosts = (Math.pow(2,(32 - newnetmask)) -2) * subnets;
			var newnetmaskbin = getNetMaskBin(newnetmask);
			var newnetmaskdotbin = addDots(newnetmaskbin);
			var newnetmaskdotdec = String(binTodec(newnetmaskdotbin.substring(0,8)))+"."+String(binTodec(newnetmaskdotbin.substring(9,17)))+"."+String(binTodec(newnetmaskdotbin.substring(18,26)))+"."+String(binTodec(newnetmaskdotbin.substring(27)));
			var newnetmaskdotwilddec = String(255-binTodec(newnetmaskdotbin.substring(0,8)))+"."+String(255-binTodec(newnetmaskdotbin.substring(9,17)))+"."+String(255-binTodec(newnetmaskdotbin.substring(18,26)))+"."+String(255-binTodec(newnetmaskdotbin.substring(27)));
			var newnetmaskdotwildbin = dottedDecToBin(newnetmaskdotwilddec);
			
			var subnets_intro = "<table id=\"subnets_intro\"><tr><td class=\"label\">Netmask</td><td class=\"decimal bunt\" id=\"newmaskdec\"></td><td class=\"binary\" id=\"newmaskbin\"></td></tr><tr><td class=\"label\">Wildcard</td><td class=\"decimal bunt\" id=\"newwilddec\"></td><td class=\"binary\" id=\"newwildbin\"></td></tr><tr><td class=\"label\">Subnets</td><td class=\"bunt\" id=\"subnets\"></td><td class=\"bunt_2\" id=\"subnets_comment\"></td></tr><tr><td class=\"label\">Tot. host</td><td colspan=\"2\" class=\"bunt\" id=\"subnetshosts\"></td></tr></table>";
			$("#ipcalc_networks").append(subnets_intro);
			
			$("#newmaskdec").text(newnetmaskdotdec);
			$("#newmaskbin").html(formatDotBin(newnetmaskdotbin,"None",netmask,newnetmask));
			$("#newwilddec").text(newnetmaskdotwilddec);
			$("#newwildbin").html(formatDotBin(newnetmaskdotwildbin,"None",netmask,newnetmask));
			$("#subnets").text(subnets);
			$("#subnetshosts").text(totalhosts);
			
			//print subnets info
			for(var i=1;i <= subnets;i++){
				
				if(i > max_subnet_limit){
					break;	
				}	
				
				//define subnet network address
				subnetnetbin = networkpart+subnet_slice+hosts_slice;
				subnetnetdotbin = addDots(subnetnetbin);
				subnetclass = checkNetClass(subnetnetbin);	
				subnetnetdotdec = String(binTodec(subnetnetdotbin.substring(0,8)))+"."+String(binTodec(subnetnetdotbin.substring(9,17)))+"."+String(binTodec(subnetnetdotbin.substring(18,26)))+"."+String(binTodec(subnetnetdotbin.substring(27)));
				
				//define subnet broadcast address
				subnetbroadcastbin = getBroadcast(subnetnetbin,newnetmask);			//subnet broadcast address in binary format
				subnetbroadcastdotbin = addDots(subnetbroadcastbin);				//subnet broadcast address in dotted binary format
				subnetbroadcastdotdec = dottedBinToDec(subnetbroadcastdotbin);  	//subnet broadcast address in dotted decimal format
				
				//define subnet first host
				subnetfirsthostbin = getFirstHost(subnetnetbin,newnetmask);			//first subnet host address in binary format
				subnetfirsthostdotbin = addDots(subnetfirsthostbin);				//first subnet host address in dotted binary format		
				subnetfirsthostdotdec = dottedBinToDec(subnetfirsthostdotbin);		//first subnet host address in dotted decimal format
				
				//define subnet last host
				subnetlasthostbin = getLastHost(subnetnetbin,newnetmask);			//last subnet host address in binary format
				subnetlasthostdotbin = addDots(subnetlasthostbin);					//last subnet host address in dotted binary format
				subnetlasthostdotdec = dottedBinToDec(subnetlasthostdotbin);		//last subnet host address in dotted decimal format
		
				//print subnet info
				subnet_table = "<table class=\"subnet_info\"><tr><td class=\"label\">Network</td><td id=\"subnetnetdec"+i+"\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"subnetnetbin"+i+"\"></td><td id=\"subnet_class"+i+"\" class=\"bunt_3\"></tr><tr><td class=\"label\">Broadcast</td><td id=\"subnetbroaddec"+i+"\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"subnetbroadbin"+i+"\"></td></tr><tr><td class=\"label\">First Host</td><td id=\"subnetfhdec"+i+"\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"subnetfhbin"+i+"\"></td></tr><tr><td class=\"label\">Last Host</td><td id=\"subnetlhdec"+i+"\" class=\"decimal bunt\"></td><td class=\"binary\" id=\"subnetlhbin"+i+"\"></td></tr><tr><td class=\"label\">Hosts/Net</td><td class=\"bunt\" id=\"subnethostsdec"+i+"\" colspan=\"2\"></td></tr></table>";
				$("#ipcalc_networks").append(subnet_table);
		
				var privateNet = "";
				if(checkRFC1918(subnetnetdotdec))
				{
					privateNet = " - private network"
				}
				$("#subnetnetdec"+i+"").text(subnetnetdotdec+"/"+newnetmask);
				$("#subnetnetbin"+i+"").html(formatDotBin(subnetnetdotbin,subnetclass,netmask,newnetmask));
				$("#subnet_class"+i+"").text("(Class "+subnetclass+privateNet+")");
				$("#subnetbroaddec"+i+"").text(subnetbroadcastdotdec);
				$("#subnetbroadbin"+i+"").html(formatDotBin(subnetbroadcastdotbin,"None",netmask,newnetmask));
				$("#subnetfhdec"+i+"").text(subnetfirsthostdotdec);
				$("#subnetfhbin"+i+"").html(formatDotBin(subnetfirsthostdotbin,"None",netmask,newnetmask));
				$("#subnetlhdec"+i+"").text(subnetlasthostdotdec);
				$("#subnetlhbin"+i+"").html(formatDotBin(subnetlasthostdotbin,"None",netmask,newnetmask));
				$("#subnethostsdec"+i+"").text(hosts);
				
				subnet_slice_len = subnet_slice.length;
				subnet_slice_dec = binTodec(subnet_slice);
				subnet_slice_dec++;
				subnet_slice = decTobin(subnet_slice_dec);
				if(subnet_slice_len < subnet_slice.length){
					subnet_slice = subnet_slice.substr(subnet_slice.length - subnet_slice_len);
				}else{
					len_to_add = subnet_slice_len - subnet_slice.length;
					
					for(var j = 0; j < len_to_add; j++){
						subnet_slice = "0"+subnet_slice
					}
				}	
			}
			
			$("#subnets_comment").text("showing "+String(i-1)+" of "+subnets+" total subnets");
		}			
		
		$("#ipcalc_networks").show();	
	}
		
	//MAIN FUNCTION
	$.fn.ipv4calc = function(){
		
		var fields_table = "<table id=\"ipcalc_fields_container\"><tr><td><input id=\"f1\" name=\"f1\" type=\"text\" maxlength=3></td><td>.</td><td><input id=\"f2\" name=\"f2\" type=\"text\" maxlength=3></td><td>.</td><td><input id=\"f3\" name=\"f3\" type=\"text\" maxlength=3></td><td>.</td><td><input id=\"f4\" name=\"f4\" type=\"text\" maxlength=3></td><td>/</td><td><input id=\"netmask\" name=\"netmask\" type=\"text\" placeholder=\"netmask\"></td><td>=></td><td><input id=\"newnetmask\" name=\"newnetmask\" type=\"text\" placeholder=\"netmask (sub/supernets)\"></td><td><input id=\"ipcalc_calc\" name=\"ipcalc_calc\" class=\"ipcalc_submit\" type=\"button\" value=\"Calculate\"></td></tr></table>";
		var error_box = "<div id=\"ipcalc_errorbox\"></div>";
		var main_table = "<p id=\"main_info_title\" class=\"title\">Network Info</p><table id=\"ipcalc_main_infos\"><tr><td class=\"label\">Address</td><td class=\"decimal bunt\" id=\"addrdec\"></td><td class=\"binary\" id=\"addrbin\"></td></tr><tr><td class=\"label\">Netmask</td><td class=\"decimal bunt\"  id=\"maskdec\"></td><td class=\"binary\" id=\"maskbin\"></td></tr><tr><td class=\"label\">Wildcard</td><td class=\"decimal bunt\"  id=\"wildmaskdec\"></td><td class=\"binary\" id=\"wildmaskbin\"></td></tr><tr><td class=\"label\">Network</td><td class=\"decimal bunt\"  id=\"netdec\"></td><td class=\"binary\" id=\"netbin\"></td><td id=\"net_class\" class=\"bunt_3\"></td></tr><tr><td class=\"label\">Broadcast</td><td class=\"decimal bunt\"  id=\"brddec\"></td><td class=\"binary\" id=\"brdbin\"></td></tr><tr><td class=\"label\">First Host</td><td class=\"decimal bunt\"  id=\"fhdec\"></td><td class=\"binary\" id=\"fhbin\"></td></tr><tr><td class=\"label\">Last Host</td><td class=\"decimal bunt\" id=\"lhdec\"></td><td class=\"binary\" id=\"lhbin\"></td></tr><tr><td class=\"label\">Hosts/Net</td><td colspan=\"2\" class=\"bunt\" id=\"hosts\"></td></tr></table>";
		var networks_div = "<div id=\"ipcalc_networks\"></div>"
		
		$(this).append("<div id=\"ipcalc_main_container\"></div>");
		$("#ipcalc_main_container").append(fields_table);
		$("#ipcalc_main_container").append(error_box);
		$("#ipcalc_main_container").append(main_table);
		$("#ipcalc_main_container").append(networks_div);
			
		$('#ipcalc_errorbox').hide();	
		$("#main_info_title").hide();
		$("#ipcalc_main_infos").hide();
		$("#ipcalc_networks").hide();	
			
		$("#ipcalc_calc").click(function() {	
			var f1 = $("#f1").val();
			var f2 = $("#f2").val();
			var f3 = $("#f3").val();
			var f4 = $("#f4").val();		
			var netmask = $("#netmask").val();
			var newnetmask = $("#newnetmask").val();
			
			//validate fields
			var res1 = validate("#f1",f1);
			var res2 = validate("#f2",f2);
			var res3 = validate("#f3",f3);	
			var res4 = validate("#f4",f4);
			var resnet = validate("#netmask",netmask,"netmask")
			var resnewnet = validate("#newnetmask",newnetmask,"netmask")
			
			if(res1 && res2 && res3 && res4 && resnet)
			{
				$('#ipcalc_errorbox').hide();
				getMainNetwork(f1+"."+f2+"."+f3+"."+f4,netmask);
			}
			else
			{
				$('#ipcalc_errorbox').html("");
				$('#ipcalc_errorbox').append("<p>Invalid values entered</p>");	
				$('#ipcalc_main_infos').hide();
				$('#main_info_title').hide();
				$('#ipcalc_networks').hide();	
				$('#ipcalc_errorbox').show();	
			}
			
			if(newnetmask != "" && (netmask != newnetmask))
			{
				if(res1 && res2 && res3 && res4 && resnet && resnewnet)
				{
					$('#ipcalc_errorbox').hide();
					getAllNetworks(f1+"."+f2+"."+f3+"."+f4,netmask,newnetmask)
				}	
				else
				{
					$('#ipcalc_errorbox').html("");
					$('#ipcalc_errorbox').append("<p>Invalid values entered</p>");	
					$('#ipcalc_main_infos').hide();
					$('#main_info_title').hide();
					$('#ipcalc_networks').hide();
					$('#ipcalc_errorbox').show();	
				}	
			}
			else
			{
				$('#ipcalc_networks').hide();
			}	
		});		
	}	
		