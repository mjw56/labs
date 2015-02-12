//
//  ViewController.swift
//  react-canvas-ios
//
//  Created by Mike Wilcox on 11/02/2015.
//  Copyright (c) 2015 react canvas. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var webView: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let localfilePath = NSBundle.mainBundle().URLForResource("index", withExtension: "html");
        let myRequest = NSURLRequest(URL: localfilePath!);
        webView.loadRequest(myRequest);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

