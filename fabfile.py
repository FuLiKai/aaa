# coding: utf-8
import os
import re
import time
from fabric.api import run, env, local, cd, hosts, hide
from fabric.decorators import with_settings

SOURCE_DIR = '/home/lukou/.lukou_source/wechat-im'
FETCH_DIR = '/home/lukou/app/lannister/wechat-im'
TEST_DIR = '/home/lukou/app/paidan/test6/wechat-im'
ROOT_DIR = '/home/lukou/.lukou_source'
PROJECT_NAME = 'wechat-im'
DEPLOY_HOST = '120.26.131.154'
env.user = 'lukou'


FETCH_HOSTS = [
    # 可用区H服务器
    {
        'host': '47.99.122.191',
        'name': 'h_coupon_1',
        'lan': '172.16.240.236',
        'ports': range(8010, 8040),
    },
    {
        'host': '47.110.238.11',
        'name': 'h_coupon_2',
        'lan': '172.16.240.241',
        'ports': range(8010, 8040),
    },
    # {
    #     'host': '47.110.232.232',
    #     'name': 'h_coupon_3',
    #     'lan': '172.16.240.243',
    #     'ports': range(8010, 8040),
    # },
    # {
    #     'host': '47.110.235.252',
    #     'name': 'h_coupon_4',
    #     'lan': '172.16.240.244',
    #     'ports': range(8010, 8040),
    # },
    {
        'host': '47.110.229.71',
        'name': 'h_coupon_5',
        'lan': '172.16.240.242',
        'ports': range(8010, 8040),
    },
    {
        'host': '47.110.232.255',
        'name': 'h_coupon_6',
        'lan': '172.16.240.245',
        'ports': range(8010, 8040),
    },
    {
        'host': '47.98.211.13',
        'name': 'coupon_tmp001',
        'lan': '172.16.241.75',
        'ports': range(8010, 8040),
    },
    {
        'host': '118.31.3.24',
        'name': 'coupon_tmp002',
        'lan': '172.16.241.74',
        'ports': range(8010, 8040),
    }
]
INFERPLUS_SERVERS = [
    {
        'host': '120.26.58.219',
        'name': 'coupon1',
        'lan': '10.175.206.78',
        'ports': range(8810, 8840)
    },
    {
        'host': '121.41.56.174',
        'name': 'coupon2',
        'lan': '10.168.192.147',
        'ports': range(8810, 8840)
    },
    {
        'host': '47.97.110.166',
        'name': 'khand',
        'lan': '172.16.241.72',
        'ports': range(8810, 8815)
    },
]

@hosts(DEPLOY_HOST)
@with_settings(warn_only=True)
def make_source():
    if not run('test -d %s && echo 1' % ROOT_DIR):
        run('mkdir %s' % ROOT_DIR)
    if not run('test -d %s && echo 1' % SOURCE_DIR):
        run('git clone git@code.lukou.com:frontend/wechat-im.git %s' % SOURCE_DIR)
    with cd(SOURCE_DIR):
        run('git pull origin master')
        run('npm install')
        run('npm run build')

@with_settings(warn_only=True)
def sync_source(remote):
    env.host_string = remote
    remote_dir = '/home/lukou/app/lannister/'
    remote_asset_dir = os.path.join(remote_dir, 'wechat-im')
    if not run('test -d %s && echo 1' % remote_asset_dir):
        run('mkdir -p %s' % remote_asset_dir)

    env.host_string = DEPLOY_HOST
    source_dir = os.path.join(ROOT_DIR, PROJECT_NAME)
    print source_dir
    with cd(source_dir):
        # !!!!资源文件先行
        sync_doc_str = 'rsync -e "ssh -o StrictHostKeyChecking=no" -r build/* lukou@%s:%s' % (remote, remote_asset_dir)
        run(sync_doc_str)
        # sync_asset_str = 'rsync -e "ssh -o StrictHostKeyChecking=no" build/*.html lukou@%s:%s' % (remote, remote_dir)
        # run(sync_asset_str)

def make_test_source(isTest1=False):
    if isTest1:
        local('npm run test')
    else:
        local('yarn onlineTest')

def test5(remote='121.41.121.230', make=None):
    # make_test_source()
    sync_str = 'rsync --delete-after -r --exclude-from rsync-exclude.txt %s %s@%s:%s'
    local(sync_str % (os.getcwd() + '/build/*', env.user, remote, '/home/lukou/app/paidan/test5/wechat-im'))


def deploy():
    print '开始同步代码...'
    env.host_string = DEPLOY_HOST
    make_source()
    for host in FETCH_HOSTS:
        env.host_string = host['host']
        sync_source(host['host'])
